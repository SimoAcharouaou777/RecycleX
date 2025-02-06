import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  phone: string;
  dob: string;
  password: string;
  profileImage?: string;
  role?: 'user' | 'collector';


}
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private localStorageKey = 'recyclex_users';
  private currentUserKey = 'currentUser';
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  constructor() {
    const storedUser = localStorage.getItem(this.currentUserKey);
    if(storedUser) {
      this.userSubject.next(JSON.parse(storedUser));
    }
  }

  setUser(user: User | null): void {
    if(user) {
      localStorage.setItem(this.currentUserKey, JSON.stringify(user));
    } else {
      localStorage.removeItem(this.currentUserKey);
    }
    this.userSubject.next(user);
  }

  getUser(): User | null {
    return this.userSubject.getValue();
  }

  deleteUser(): void {
    const currentUser = this.getUser();
    if(!currentUser) {
      return;
    }
    localStorage.removeItem(this.currentUserKey);
    this.userSubject.next(null);

    const users: User[] = JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');
    const index = users.findIndex(u => u.email === currentUser.email);
    if(index !== -1) {
      users.splice(index, 1);
      localStorage.setItem(this.localStorageKey, JSON.stringify(users));
    }
  }

  updateUser(updatedUser: User): void {
    const currentUser = this.getUser();
    if(!currentUser) {
      return;
    }

    const oldEmail = currentUser.email;

    localStorage.setItem(this.currentUserKey, JSON.stringify(updatedUser));
    this.userSubject.next(updatedUser);

    const users: User[] = JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');
    const index = users.findIndex(u => u.email === oldEmail);
    if(index !== -1) {
      users[index] = updatedUser;
      localStorage.setItem(this.localStorageKey, JSON.stringify(users));
    }
  }


}
