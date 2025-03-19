import { inject, Injectable } from '@angular/core';
import { User } from '../../Interfaces/user.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private users: User[] = [
    {
      id: 1,
      email: 'admin@example.com',
      password: 'admin',
      role: 'admin',
    },
    {
      id: 2,
      email: 'user@example.com',
      password: 'user',
      role: 'user',
    },
  ];

  private currentUser: User | null = null;

  private router = inject(Router);

  constructor() {}

  login(email: string, password: string): boolean {
    const user = this.users.find(
      (user) => user.email === email && user.password === password
    );
    if (user) {
      this.currentUser = user;
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    } else {
      return false;
    }
  }
  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
    this.navigateByUrl('/login');
  }

  getCurrentUser(): User | null {
    if (!this.currentUser) {
      const userData = localStorage.getItem('currentUser');
      if (userData) {
        this.currentUser = JSON.parse(userData) as User;
      }
    }
    return this.currentUser;
  }
  isAuthenticated(): boolean {
    return !!this.getCurrentUser();
  }
  hasRole(role: 'admin' | 'user'): boolean {
    return this.getCurrentUser()?.role === role;
  }
  navigateByUrl(url: string): void {
    this.router.navigateByUrl(url, { replaceUrl: true });
  }
}
