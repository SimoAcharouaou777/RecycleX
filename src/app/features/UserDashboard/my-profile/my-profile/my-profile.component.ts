import {Component, OnInit} from '@angular/core';
import {SidebarComponent} from "../../../../shared/sidebar/sidebar.component";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {User, UserService} from "../../../../shared/services/userService/user.service";
import {Subscription} from "rxjs";

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
  userSubscription!: Subscription;

  constructor(private fb: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
     this.profileForm = this.fb.group({
      firstName: ['', Validators.required ],
      lastName: ['', Validators.required ],
      email: ['',  [Validators.required, Validators.email ]],
      address: ['', Validators.required ],
      phone: ['', Validators.required ],
      dob: ['', Validators.required ],
      profileImage: [null]
    });

    this.userSubscription = this.userService.user$.subscribe((currentUser) => {
      if(currentUser) {
        this.profileForm.patchValue({
          firstName: currentUser.firstName,
          lastName: currentUser.lastName,
          email: currentUser.email,
          address: currentUser.address,
          phone: currentUser.phone,
          dob: currentUser.dob,
        });
        this.previewImage = currentUser.profileImage || '';
      }
    });
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
      const currentUser = this.userService.getUser();
      if(!currentUser) {
        return;
      }
      const oldEmail = currentUser.email;
      const newEmail = this.profileForm.value.email;

      const updatedUser: User = {
        ...currentUser,
        ...this.profileForm.value,
        profileImage: this.profileForm.value.profileImage || this.previewImage || currentUser.profileImage
      };
      this.userService.updateUser(updatedUser);

      if(oldEmail !== newEmail) {
        this.userService.notifyEmailChange(oldEmail, newEmail);
      }
    }
  }

  ngOnDestroy(): void {
    if(this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
