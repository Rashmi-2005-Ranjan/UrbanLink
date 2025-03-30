import { inject, Injectable } from '@angular/core';
import { User } from '../Interfaces/user.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthServicesService {
  //* Service users and service providers List
  private users: User[] = [
    {
      id: 1,
      email: 'serviceUser1@urbanlink.com',
      password: 'user1',
      role: 'serviceUser',
    },
    {
      id: 2,
      email: 'serviceUser2@urbanlink.com',
      password: 'user2',
      role: 'serviceUser',
    },
    {
      id: 3,
      email: 'serviceUser3@urbanlink.com',
      password: 'user3',
      role: 'serviceUser',
    },
    {
      id: 4,
      email: 'serviceUser4@urbanlink.com',
      password: 'user4',
      role: 'serviceUser',
    },
    {
      id: 5,
      email: 'serviceUser5@urbanlink.com',
      password: 'user5',
      role: 'serviceUser',
    },
    {
      id: 6,
      email: 'serviceUser6@urbanlink.com',
      password: 'user6',
      role: 'serviceUser',
    },
    {
      id: 7,
      email: 'serviceUser7@urbanlink.com',
      password: 'user7',
      role: 'serviceUser',
    },
    {
      id: 8,
      email: 'serviceUser8@urbanlink.com',
      password: 'user8',
      role: 'serviceUser',
    },
    {
      id: 9,
      email: 'serviceUser9@urbanlink.com',
      password: 'user9',
      role: 'serviceUser',
    },
    {
      id: 10,
      email: 'serviceUser10@urbanlink.com',
      password: 'user10',
      role: 'serviceUser',
    },
    {
      id: 11,
      email: 'serviceProvider1@urbanlink.com',
      password: 'provider1',
      role: 'serviceProvider',
    },
    {
      id: 12,
      email: 'serviceProvider2@urbanlink.com',
      password: 'provider2',
      role: 'serviceProvider',
    },
    {
      id: 13,
      email: 'serviceProvider3@urbanlink.com',
      password: 'provider3',
      role: 'serviceProvider',
    },
    {
      id: 14,
      email: 'serviceProvider4@urbanlink.com',
      password: 'provider4',
      role: 'serviceProvider',
    },
    {
      id: 15,
      email: 'serviceProvider5@urbanlink.com',
      password: 'provider5',
      role: 'serviceProvider',
    },
    {
      id: 16,
      email: 'serviceProvider6@urbanlink.com',
      password: 'provider6',
      role: 'serviceProvider',
    },
    {
      id: 17,
      email: 'serviceProvider7@urbanlink.com',
      password: 'provider7',
      role: 'serviceProvider',
    },
    {
      id: 18,
      email: 'serviceProvider8@urbanlink.com',
      password: 'provider8',
      role: 'serviceProvider',
    },
    {
      id: 19,
      email: 'serviceProvider9@urbanlink.com',
      password: 'provider9',
      role: 'serviceProvider',
    },
    {
      id: 20,
      email: 'serviceProvider10@urbanlink.com',
      password: 'provider10',
      role: 'serviceProvider',
    },
  ];

  private currUser: User | null = null;
  private router = inject(Router);
  constructor() {}

  //* Login Service
  login(email: string, password: string): boolean {
    const user = this.users.find(
      (user) => user.email === email && user.password === password
    );
    if (user) {
      this.currUser = user;
      localStorage.setItem('currUser', JSON.stringify(user));
      return true;
    } else {
      return false;
    }
  }

  navigateByUrl(url: string): void {
    // ✅ Correct method name
    this.router.navigateByUrl(url, { replaceUrl: true });
  }

  getCurrentUser(): User | null {
    if (!this.currUser) {
      const user = localStorage.getItem('currUser');
      if (user) {
        this.currUser = JSON.parse(user) as User;
      }
    }
    return this.currUser;
  }

  getLoggedInUserEmail(): string {
    const user = this.getCurrentUser();
    return user && user.role === 'serviceProvider' ? user.email : '';
  }

  isAuthenticated(): boolean {
    return !!this.getCurrentUser();
  }

  hasRole(role: 'serviceProvider' | 'serviceUser'): boolean {
    return this.getCurrentUser()?.role === role;
  }

  logout(): void {
    this.currUser = null;
    localStorage.removeItem('currUser');
    this.navigateByUrl('/login');
  }

  // ✅ Added method to get email for all logged-in users
  getaLoggedInUserEmail(): string {
    const user = this.getCurrentUser();
    return user ? user.email : ''; // ✅ Returns email for all logged-in users
  }
}
