import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";

export interface User {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  address?: string;
  phone?: string;
  dob?: string;
  profilePicture?: File | null;
  role?: 'user' | 'collector';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private localStorageKey = "recyclex_users";

  constructor() { this.seedCollectors() }

  login(credentials: { email: string; password: string }): Observable<boolean> {
    const users : User[] = JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');
    const user = users.find(u => u.email === credentials.email && u.password === credentials.password);
    if(user) {
      console.log('Login successful for ', credentials.email);
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

  updateProfile(updatedUser: User): Observable<boolean> {
    return of(true);
  }

  deleteAccount(email: string): Observable<boolean> {
    return of(true);
  }

  getCollectorInfo(): User | null {
    return null;
  }

  private seedCollectors(): void {
    let users: User[] = JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');
    const hasCollector = users.some(user => user.role === 'collector');
    if(!hasCollector) {
      const collectors: User[] = [
        {
          email: 'collector1@example.com',
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
