import {Component, OnInit} from '@angular/core';
import {SidebarComponent} from "../../../../shared/sidebar/sidebar.component";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {User, UserService} from "../../../../shared/services/userService/user.service";

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [
    SidebarComponent,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css'
})
export class MyProfileComponent implements OnInit{
  profileForm!: FormGroup;
  previewImage: string = '';

  constructor(private fb: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    const currentUser = this.userService.getUser() || {
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      phone: '',
      dob: '',
      profileImage: ''
    };
    this.profileForm = this.fb.group({
      firstName: [currentUser.firstName, Validators.required ],
      lastName: [currentUser.lastName, Validators.required ],
      email: [currentUser.email, [ Validators.required, Validators.email ]],
      address: [currentUser.address, Validators.required ],
      phone: [currentUser.phone, Validators.required ],
      dob: [currentUser.dob, Validators.required ],
      profileImage: [null]
    });
    this.previewImage = currentUser.profileImage || '';
  }

  onFileSelected(event: any): void {
    if(event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.previewImage = reader.result as string;
        this.profileForm.patchValue({ profileImage: this.previewImage });
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if(this.profileForm.valid) {
      const updatedUser: User = {
        ...this.profileForm.value,
        profileImage: this.profileForm.value.profileImage || this.previewImage || ''
      };
      this.userService.setUser(updatedUser);
    }
  }
}
