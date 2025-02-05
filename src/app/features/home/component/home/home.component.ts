import { Component } from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../../auth/services/auth.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private authService: AuthService, private router: Router) { }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
