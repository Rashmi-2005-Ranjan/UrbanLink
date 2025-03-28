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
    path: 'login',
    loadComponent: () =>
      import('./Components/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'user-dashboard',
    loadComponent: () =>
      import('./Components/user-dashboard/user-dashboard.component').then(
        (m) => m.UserDashboardComponent
      ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./Components/user-dashboard/home/home.component').then(
            (m) => m.HomeComponent
          ),
      },
      {
        path: 'home',
        loadComponent: () =>
          import('./Components/user-dashboard/home/home.component').then(
            (m) => m.HomeComponent
          ),
      },
      {
        path: 'search-service',
        loadComponent: () =>
          import(
            './Components/user-dashboard/search-services/search-services.component'
          ).then((m) => m.ServiceSearchComponent),
      },
    ],
  },
  {
    path: 'service-provider-dashboard',
    loadComponent: () =>
      import(
        './Components/service-provider-dashboard/service-provider-dashboard.component'
      ).then((m) => m.ServiceProviderDashboardComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import(
            './Components/service-provider-dashboard/home/home.component'
          ).then((m) => m.HomeComponent),
      },
      {
        path: 'home',
        loadComponent: () =>
          import(
            './Components/service-provider-dashboard/home/home.component'
          ).then((m) => m.HomeComponent),
      },
      {
        path: 'add-service',
        loadComponent: () =>
          import(
            './Components/service-provider-dashboard/register-service/register-service.component'
          ).then((m) => m.RegisterServiceComponent),
      },
      {
        path: 'view-requests',
        loadComponent: () =>
          import(
            './Components/service-provider-dashboard/view-requests/view-requests.component'
          ).then((m) => m.ViewRequestsComponent),
      },
      {
        path: 'manage-services',
        loadComponent: () =>
          import(
            './Components/service-provider-dashboard/manage-services/manage-services.component'
          ).then((m) => m.ManageServicesComponent),
      },
    ],
  },
  { path: '**', component: NotFoundComponent }, // Wildcard route
];
