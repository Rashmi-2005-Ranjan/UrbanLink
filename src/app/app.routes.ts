import { Routes } from '@angular/router';
import { LandingPageComponent } from './Components/landing-page/landing-page.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { authGuard } from './Guards/Auth/auth.guard';
import { serviceProviderOnlyGuard } from './Guards/ServiceProvider/service-provider-only.guard';
import { unsavedChangesGuard } from './Guards/UnsavedChanges/unsaved-changes.guard';
import { userAuthGuard } from './Guards/UserAuth/auth.guard';

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
    path: 'register',
    loadComponent: () =>
      import('./Components/register/register.component').then(
        (m) => m.RegisterComponent
      ),
  },
  {
    path: 'forgot-password',
    loadComponent: () =>
      import('./Components/forgot-password/forgot-password.component').then(
        (m) => m.ForgotPasswordComponent
      ),
  },
  {
    canActivate:[userAuthGuard],
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
      {
        path: 'show-status',
        loadComponent: () =>
          import(
            './Components/user-dashboard/show-status/show-status.component'
          ).then((m) => m.ShowStatusComponent),
      },
      {
        path: 'view-rejected-services',
        loadComponent: () =>
          import('./Components/shared/shared.component').then(
            (m) => m.SharedComponent
          ),
      },
    ],
  },
  {
    canActivate:[authGuard],
    canMatch:[serviceProviderOnlyGuard],
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
      {
        path: 'view-reject-services',
        loadComponent: () =>
          import('./Components/shared/shared.component').then(
            (m) => m.SharedComponent
          ),
      },
    ],
  },
  { path: '**', component: NotFoundComponent }, // Wildcard route
];
