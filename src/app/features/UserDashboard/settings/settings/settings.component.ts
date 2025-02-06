import {Component, OnInit} from '@angular/core';
import {SidebarComponent} from "../../../../shared/sidebar/sidebar.component";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {User, UserService} from "../../../../shared/services/userService/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    SidebarComponent,
    ReactiveFormsModule
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent implements OnInit{
  settingsForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
    this.settingsForm = this.fb.group({
      newPassword: ['', Validators.required ],
      confirmPassword: ['', Validators.required ]
    });
  }

  onUpdatePassword(): void {
    if (this.settingsForm.valid) {
      const { newPassword, confirmPassword } = this.settingsForm.value;
      if (newPassword !== confirmPassword) {
        alert('Password do not match!');
        return;
      }
      const currentUser = this.userService.getUser();
      if(currentUser) {
        const updatedUser: User = { ...currentUser, password: newPassword };
        this.userService.updateUser(updatedUser);
        alert('Password updated successfully!');
      } else {
        alert('No user found!');
      }
    }
  }

  onDeleteAccount(): void {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      this.userService.deleteUser();
      alert('Account deleted successfully!');
      this.router.navigate(['/login']);
    }
  }

}
