import {Component, OnInit} from '@angular/core';
import {Request} from "../../../collection/store/request.model";
import {Subscription} from "rxjs";
import {UserService} from "../../../../shared/services/userService/user.service";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
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
    FormsModule
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
      this.progressRequests = storedProgressRequests.filter(
        (req: Request) => req.userEmail === this.currentUser.email
      );
    }
  }

  editRequest(req: Request) {
    req.isEditing = true;
  }

  saveRequest(req: Request) {
    if(req.weight < 1000 || req.weight > 10000) {
      alert('Minimum weight should be 1000 grams, and maximum weight should be 10000 grams (10 kg)');
      return;
    }

    req.isEditing = false;
    const index = this.progressRequests.findIndex(
      r => r.address === req.address && r.userEmail === req.userEmail
    );
    if(index !== -1) {
      this.progressRequests[index] = req;
    }
    let stored = JSON.parse(localStorage.getItem('progressRequests') || '[]') as Request[];
    stored = stored.map(r => {
      if(r.address === req.address && r.userEmail === req.userEmail) {
        return req;
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

}
