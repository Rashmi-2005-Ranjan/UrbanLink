import { Routes } from '@angular/router';
import { LandingPageComponent } from './Components/landing-page/landing-page.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent }, // Default route
  {
    path: 'features',
    loadComponent: () =>
      import('./Components/features/features.component').then(
        (m) => m.FeaturesComponent
      ),
  },
  {
    path: 'pricing',
    loadComponent: () =>
      import('./Components/pricing/pricing.component').then(
        (m) => m.PricingComponent
      ),
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./Components/contact/contact.component').then(
        (m) => m.ContactComponent
      ),
  },
  {
    path:'login',
    loadComponent: () =>
      import('./Components/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path:'user-dashboard',
    loadComponent:()=>
      import('./Components/user-dashboard/user-dashboard.component').then(
        (m)=>m.UserDashboardComponent
      ),
  },
  {
    path:'service-provider-dashboard',
    loadComponent:()=>import('./Components/service-provider-dashboard/service-provider-dashboard.component').then(
      (m) => m.ServiceProviderDashboardComponent
    ),
  },
  { path: '**', component: NotFoundComponent }, // Wildcard route
];
