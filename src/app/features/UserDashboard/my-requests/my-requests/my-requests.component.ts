import {Component, OnInit} from '@angular/core';
import {SidebarComponent} from "../../../../shared/sidebar/sidebar.component";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {DatePipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {Request} from "../../../collection/store/request.model";
import {Store} from "@ngrx/store";
import * as RequestActions from "../../../collection/store/request.action";
import {UserService} from "../../../../shared/services/userService/user.service";
import {Subscription} from "rxjs";
import {selectAllRequests} from "../../../collection/store/request.selectors";



@Component({
  selector: 'app-my-requests',
  standalone: true,
  imports: [
    SidebarComponent,
    ReactiveFormsModule,
    NgForOf,
    NgIf,
    DatePipe,
    NgClass
  ],
  templateUrl: './my-requests.component.html',
  styleUrl: './my-requests.component.css'
})
export class MyRequestsComponent implements OnInit{
  requestForm!: FormGroup;
  wasteTypes: string[] = ['Plastic', 'Paper', 'Metal', 'Glass'];
  selectedWasteTypes: string[] = [];
  timeSlots: string[] = [
    '09:00 AM - 10:00 AM',
    '10:00 AM - 11:00 AM',
    '11:00 AM - 12:00 PM',
    '12:00 PM - 13:00 PM',
    '13:00 PM - 14:00 PM',
    '14:00 PM - 15:00 PM',
    '15:00 PM - 16:00 PM',
    '16:00 PM - 17:00 PM',
    '17:00 PM - 18:00 PM',
  ];

  myRequests: Request[] = [];
  private subscriptions: Subscription = new Subscription();

  constructor(private fb: FormBuilder, private store: Store, private userService: UserService) { }

  ngOnInit(): void {
    this.requestForm = this.fb.group({
      address: ['', Validators.required],
      date: ['', Validators.required],
      timeSlot: ['', Validators.required],
      notes: ['']
    });

    this.wasteTypes.forEach(type => {
      this.requestForm.addControl(`weight_${type}`, new FormControl(null, [Validators.min(1000)]));
    });

    const currentUser = this.userService.getUser();
    if(currentUser) {
      const pendingRequests = JSON.parse(localStorage.getItem('pendingRequests') || '[]');
      const progressRequests = JSON.parse(localStorage.getItem('progressRequests') || '[]');
      this.myRequests = [...pendingRequests].filter(r => r.userEmail === currentUser.email);
    }

    const sub = this.store.select(selectAllRequests).subscribe((requests: Request[]) => {
      if (Array.isArray(requests)) {
        const currentUser = this.userService.getUser();
        if(currentUser && currentUser.email) {
          const storedRequests = this.myRequests;
          this.myRequests = [
            ...storedRequests,
            ...requests.filter(r => r.userEmail === currentUser.email)
          ];
        } else {
          console.error('Invalid data structure for requests: ', requests);
          this.myRequests = [];
        }
      } else {
        this.myRequests = [];
      }
    });
    this.subscriptions.add(sub);

    const emailChangeSub = this.userService.emailChange$.subscribe(emailChange => {
      if(emailChange) {
        this.updateUserEmailInLocalStorage(emailChange.oldEmail, emailChange.newEmail);
      }
    });
    this.subscriptions.add(emailChangeSub);
  }

  updateUserEmailInLocalStorage(oldEmail: string, newEmail: string) {
    ['pendingRequests', 'progressRequests'].forEach(Key => {
      let requests = JSON.parse(localStorage.getItem(Key) || '[]');
      requests = requests.map((request: Request) =>
        request.userEmail === oldEmail ? { ...request, userEmail: newEmail } : request
      );
      localStorage.setItem(Key, JSON.stringify(requests));
    });
    this.myRequests = this.myRequests.map(req =>
    req.userEmail === oldEmail ? { ...req, userEmail: newEmail } : req
    );
  }

  onWasteTypeChange(event: any, type: string): void {
    if(event.target.checked) {
      this.selectedWasteTypes.push(type);
      this.requestForm.addControl(`weight_${type}`, new FormControl(null, [Validators.required, Validators.min(1000)]));
    } else {
      const index = this.selectedWasteTypes.indexOf(type);
      if(index !== -1) {
        this.selectedWasteTypes.splice(index, 1);
        this.requestForm.removeControl(`weight_${type}`);
      }
    }
  }

  get totalWeight(): number {
   return this.selectedWasteTypes.reduce((total, type) => {
     const weight = this.requestForm.get(`weight_${type}`)?.value || 0;
     return total + weight;
   }, 0);
  }


  onSubmit(): void {
    if(this.requestForm.valid && this.totalWeight <= 10000) {
      const currentUser = this.userService.getUser();
      if(!currentUser) return;

     const wastes = this.selectedWasteTypes.map(type => ({
       type,
       weight: this.requestForm.get(`weight_${type}`)?.value
     }));

      const requestData: Request = {
        userEmail: currentUser.email,
        wastes,
        address: this.requestForm.get('address')?.value,
        date: this.requestForm.get('date')?.value,
        timeSlot: this.requestForm.get('timeSlot')?.value,
        notes: this.requestForm.get('notes')?.value,
        status: 'PENDING'
      }

      this.store.dispatch(RequestActions.addRequest({ request: requestData }));
      this.myRequests.push(requestData);
      this.saveToLocalStorage('pendingRequests', requestData);
      this.requestForm.reset();
      this.selectedWasteTypes = [];
    } else {
      this.requestForm.markAllAsTouched();
    }
  }

  progressRequest(req: Request) {
    const currentUser = this.userService.getUser();
    if(!currentUser) return;
    let allRequests = JSON.parse(localStorage.getItem('progressRequests') || '[]') as Request[];
    const userProgressRequests = allRequests.filter(r => r.userEmail === currentUser.email && r.status === 'PENDING');

    if(userProgressRequests.length >= 3) {
      alert('You can only have 3 progress up to 3 requests at a time');
      return;
    }

    this.removeFromLocalStorage('pendingRequests', req);
    this.saveUniqueToLocalStorage('progressRequests', req);
    this.myRequests = this.myRequests.filter(r => r !== req);
  }

  deleteRequest(req: Request) {
    this.myRequests = this.myRequests.filter(r => r !== req);
  }

  progressAllRequests() {
    const currentUser = this.userService.getUser();
    if (!currentUser) return;

    let pendingRequests = JSON.parse(localStorage.getItem('pendingRequests') || '[]') as Request[];
    const userPending = pendingRequests.filter(r => r.userEmail === currentUser.email);

    let progressRequests = JSON.parse(localStorage.getItem('progressRequests') || '[]') as Request[];
    const userProgressRequests = progressRequests.filter(r => r.userEmail === currentUser.email && r.status === 'PENDING');

    if(userProgressRequests.length >= 3) {
      alert('You can only have 3 progress up to 3 requests at a time');
      return;
    }

    userPending.forEach(req => {
      this.removeFromLocalStorage('pendingRequests', req);
      this.saveUniqueToLocalStorage('progressRequests', req);
    });
    this.myRequests = this.myRequests.filter(r => r.userEmail !== currentUser.email);
  }


  deleteAllRequests() {
    this.myRequests = [];
  }

  saveToLocalStorage(Key: string, request: Request) {
    const existingRequests = JSON.parse(localStorage.getItem(Key) || '[]');
    existingRequests.push(request);
    localStorage.setItem(Key, JSON.stringify(existingRequests));
  }

  saveUniqueToLocalStorage(Key: string, request: Request) {
    const existingRequests = JSON.parse(localStorage.getItem(Key) || '[]') as Request[];
    const exists = existingRequests.some(r => r.userEmail === request.userEmail && r.address === request.address);
    if(!exists) {
      existingRequests.push(request);
      localStorage.setItem(Key, JSON.stringify(existingRequests));
    }
  }

  removeFromLocalStorage(Key: string, request: Request): void {
    let existingRequests = JSON.parse(localStorage.getItem(Key) || '[]') as Request[];
    existingRequests = existingRequests.filter(r => r.address !== request.address || r.userEmail !== request.userEmail);
    localStorage.setItem(Key, JSON.stringify(existingRequests));
  }

  getWasteTypesString(req: Request): string {
      return req.wastes.map(w => w.type).join(', ');
  }

  getTotalWeight(wastes: { type: string; weight: number }[]): number {
    return (wastes ?? []).reduce((total, waste) => total + waste.weight, 0);
  }


}
