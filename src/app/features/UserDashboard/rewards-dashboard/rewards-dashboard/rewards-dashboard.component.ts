import {Component, OnInit} from '@angular/core';
import {SidebarComponent} from "../../../../shared/sidebar/sidebar.component";
import {AuthService} from "../../../auth/services/auth.service";
import {authGuard} from "../../../../core/guard/auth.guard";
import {UserService} from "../../../../shared/services/userService/user.service";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-rewards-dashboard',
  standalone: true,
  imports: [
    SidebarComponent,
    NgForOf
  ],
  templateUrl: './rewards-dashboard.component.html',
  styleUrl: './rewards-dashboard.component.css'
})
export class RewardsDashboardComponent implements OnInit{
  constructor(private userService: UserService) { }
  totalPoints: number = 0;
  vouchers: { points: number; amount: number }[] = [
    { points: 100, amount: 50 },
    { points: 200, amount: 120 },
    { points: 500, amount: 350 }
  ];

  ngOnInit(): void {
    this.calculateTotalPoints();
  }

  calculateTotalPoints(): void {
    const currentUser = this.userService.getUser();
    if(!currentUser) {
      console.error('No user is currently logged in');
      return;
    }
    const currentUserEmail = currentUser.email;
    const allRequest : any[] = JSON.parse(localStorage.getItem('progressRequests') || '[]');
    const userRequest = allRequest.filter(req => req.userEmail === currentUserEmail && req.status === 'Validated');

    const pointsFromRequests = userRequest.reduce((total, req) => total + (req.pointsEarned || 0), 0);
    const redeemedPoints = this.loadRedeemedPointsFromLocalStorage();
    this.totalPoints = pointsFromRequests - redeemedPoints;
  }

  redeemVoucher(voucher: { points: number; amount: number }): void {
    if(this.totalPoints >= voucher.points) {
      const redeemedPoints = this.loadRedeemedPointsFromLocalStorage();
      const newRedeemedPoints = redeemedPoints + voucher.points;

      this.saveTotalPointsToLocalStorage(newRedeemedPoints) ;
      this.totalPoints -= voucher.points;
      alert(`You have redeemed a voucher worth ${voucher.amount} DH!`);
    } else {
      alert(' Insufficient points to redeem this voucher');
    }
  }

  saveTotalPointsToLocalStorage(redeemedPoints: number): void {
    const currentUser = this.userService.getUser();
    if(!currentUser) {
      console.error('No user is currently logged in');
      return;
    }
    localStorage.setItem(`userRedeemedPoints_${currentUser.email}`, JSON.stringify(redeemedPoints));
  }

  loadRedeemedPointsFromLocalStorage(): number {
    const currentUser = this.userService.getUser();
    if(!currentUser) {
      console.error('No user is currently logged in');
      return 0;
    }
    const storedRedeemedPoints = localStorage.getItem(`userRedeemedPoints_${currentUser.email}`);
    return storedRedeemedPoints ? JSON.parse(storedRedeemedPoints) : 0;
  }

  loadTotalPointsFromLocalStorage(): number {
    const currentUser = this.userService.getUser();
    if(!currentUser) {
      console.log('No user is currently logged in');
      return 0;
    }
    const storedPoints = localStorage.getItem(`userTotalPoints_${currentUser.email}`);
    return storedPoints ? JSON.parse(storedPoints) : 0;
  }

}
