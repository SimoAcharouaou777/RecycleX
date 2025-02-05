import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit{
  signupForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      address:['', Validators.required],
      phone: ['', Validators.required],
      dob:['', Validators.required],
      profilePicture: [null]
    });
  }

  onSignup(): void {
    if(this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }
    this.authService.register(this.signupForm.value).subscribe(success => {
      if(success) {
        this.router.navigate(['/login']);
        console.log('User registered successfully');
      } else {
        console.log('User registration failed');
      }
    });
  }

}
