import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

export interface User {
  firstName: String;
  lastName: string;
  email: string;
  address: string;
  phone: string;
  dob: string;
  password: string;
  profileImage?: string;


}
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private localStorageKey = 'currentUser';
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  constructor() {
    const storedUser = localStorage.getItem(this.localStorageKey);
    if(storedUser) {
      this.userSubject.next(JSON.parse(storedUser));
    }
  }

  setUser(user: User): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(user));
    this.userSubject.next(user);
  }

  getUser(): User | null {
    return this.userSubject.getValue();
  }

  deleteUser(): void {
    localStorage.removeItem(this.localStorageKey);
    this.userSubject.next(null);
  }


}
