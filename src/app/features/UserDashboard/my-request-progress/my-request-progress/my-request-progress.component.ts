import {Component, OnInit} from '@angular/core';
import {Request} from "../../../collection/store/request.model";
import {Subscription} from "rxjs";
import {UserService} from "../../../../shared/services/userService/user.service";
import {DatePipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {SidebarComponent} from "../../../../shared/sidebar/sidebar.component";
import {FormsModule} from "@angular/forms";


@Component({
  selector: 'app-my-request-progress',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    SidebarComponent,
    DatePipe,
    FormsModule,
    NgClass
  ],
  templateUrl: './my-request-progress.component.html',
  styleUrl: './my-request-progress.component.css'
})
export class MyRequestProgressComponent implements OnInit{
  progressRequests: Request[] = [];
  private subscriptions: Subscription = new Subscription();
  currentUser: any;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.currentUser = this.userService.getUser();
    if (this.currentUser) {
      const storedProgressRequests = JSON.parse(localStorage.getItem('progressRequests') || '[]');
      this.progressRequests = storedProgressRequests
        .filter((req: Request) => req.userEmail === this.currentUser.email)
        .map((req: Request) => ({ ...req, isEditing: false }));
    }

    const emailChangeSub = this.userService.emailChange$.subscribe(emailChange => {
      if(emailChange) {
        this.updateUserEmailInRequests(emailChange.oldEmail, emailChange.newEmail);
      }
    });
    this.subscriptions.add(emailChangeSub);
  }

  private updateUserEmailInRequests(oldEmail: string, newEmail: string): void {
    this.progressRequests = this.progressRequests.map(req =>
      req.userEmail === oldEmail ? { ...req, userEmail: newEmail } : req
    );

    const stored = JSON.parse(localStorage.getItem('progressRequests') || '[]');
    const updated = stored.map((req: Request) =>
      req.userEmail === oldEmail ? { ...req, userEmail: newEmail } : req
    );
    localStorage.setItem('progressRequests', JSON.stringify(updated));
  }

  getWasteTypesString(req: Request): string {
    return req.wastes.map(w => w.type).join(', ');
  }

  editRequest(req: Request) {
    req.isEditing = true;
  }

  saveRequest(req: Request): void {
    const invalidWeights = req.wastes.some(waste => waste.weight < 1000 || waste.weight > 10000);
    if(invalidWeights) {
      alert('Each waste type must have a weight between  1000 grams and 10000 grams (10 kg)');
      return;
    }

    const totalWeight = this.getTotalWeight(req.wastes);
    if(totalWeight > 10000) {
      alert('Total weight of all waste types must not exceed 10000 grams (10 kg)');
      return;
    }

    req.isEditing = false;

    const index = this.progressRequests.findIndex(
      r => r.address === req.address && r.userEmail === req.userEmail
    );
    if(index !== -1) {
      this.progressRequests[index] = { ...req};
    }

    let stored = JSON.parse(localStorage.getItem('progressRequests') || '[]') as Request[];
    stored = stored.map(r => {
      if(r.address === req.address && r.userEmail === req.userEmail) {
        return { ...req};
      }
      return r;
    });
    localStorage.setItem('progressRequests', JSON.stringify(stored));
  }

  deleteRequest(req: Request) {
    if (req.status !== 'PENDING') return;

    this.progressRequests = this.progressRequests.filter(
      r => !(r.address === req.address && r.userEmail === req.userEmail)
    );
    let stored = JSON.parse(localStorage.getItem('progressRequests') || '[]') as Request[];
    stored = stored.filter(r => !(r.address === req.address && r.userEmail === req.userEmail));
    localStorage.setItem('progressRequests', JSON.stringify(stored));
  }

  getTotalWeight(wastes: {type: string; weight: number} []): number {
    return wastes.reduce((acc, waste) => acc + waste.weight, 0);
  }

}
