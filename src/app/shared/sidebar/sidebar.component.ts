import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../features/auth/services/auth.service";
import {User, UserService} from "../services/userService/user.service";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{
  user: User | null = null ;

  constructor(private authService: AuthService, private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.userService.user$.subscribe((u) => {
      this.user = u;
    })
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
