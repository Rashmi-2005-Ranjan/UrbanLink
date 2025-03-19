import { Routes } from '@angular/router';
import { DashboardComponent } from './Components/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('./Components/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./Components/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
  },
  
];
