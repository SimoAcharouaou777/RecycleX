import { Component , OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {NgIf} from "@angular/common";
import {UserService} from "../../../../shared/services/userService/user.service";


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    NgIf,

  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  loginForm!: FormGroup;
  loginError: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onLogin(): void {
    if(this.loginForm.invalid) {
      return;
    }
    this.authService.login(this.loginForm.value).subscribe(success => {
      if(success) {
        const user = this.userService.getUser();
        if(user?.role === 'collector') {
          this.router.navigate(['/collector-dashboard']);
        } else {
          this.router.navigate(['/home']);
        }
      } else {
        this.loginError = 'Invalid email or password';
      }
    });
  }
}
