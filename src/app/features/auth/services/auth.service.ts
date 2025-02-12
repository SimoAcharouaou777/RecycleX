import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {UserService} from "../../../shared/services/userService/user.service";

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address: string;
  phone: string;
  dob: string;
  profilePicture?: File | null;
  role?: 'user' | 'collector';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private localStorageKey = "recyclex_users";

  constructor(private userService: UserService) {
    this.seedCollectors() ;
  }

  login(credentials: { email: string; password: string }): Observable<boolean> {
    const users : User[] = JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');
    const user = users.find(u => u.email === credentials.email && u.password === credentials.password);
    if(user) {
      console.log('Login successful for ', credentials.email);
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.userService.setUser(user);
      return of(true);
    } else {
      console.log('Invalid login attempt for ', credentials.email);
      return of(false);
    }
  }

  register(user: User): Observable<boolean> {
    user.role = 'user';
    const users: User[] = JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');
    users.push(user);
    localStorage.setItem(this.localStorageKey, JSON.stringify(users));
    console.log('User registered successfully', user);
    return of(true);
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.userService.setUser(null);
    console.log('User logged out');
  }
  isAuthenticated(): boolean {
    return localStorage.getItem('currentUser') !== null;
  }



  private seedCollectors(): void {
    let users: User[] = JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');
    const hasCollector = users.some(user => user.role === 'collector');
    if(!hasCollector) {
      const collectors: User[] = [
        {
          email: 'simo@gmail.com',
          password: 'password',
          firstName: 'Collector',
          lastName: 'One',
          address: 'City A',
          phone: '1234567890',
          dob: '1980-01-01',
          role: 'collector',
          profilePicture: null
        },
        {
          email: 'collector2@example.com',
          password: 'password',
          firstName: 'Collector',
          lastName: 'Two',
          address: 'City B',
          phone: '0987654321',
          dob: '1985-05-05',
          role: 'collector',
          profilePicture: null
        }
      ];
      users = users.concat(collectors);
      localStorage.setItem(this.localStorageKey, JSON.stringify(users));
      console.log('Collectors have been seeded');
    }
  }


}
