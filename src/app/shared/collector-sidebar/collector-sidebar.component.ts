import { Component } from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../features/auth/services/auth.service";

@Component({
  selector: 'app-collector-sidebar',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './collector-sidebar.component.html',
  styleUrl: './collector-sidebar.component.css'
})
export class CollectorSidebarComponent {
  constructor(private authService: AuthService, private router: Router) { }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
