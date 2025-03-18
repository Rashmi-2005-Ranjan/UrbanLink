import { Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { LoginComponent } from './Auth Components/login/login.component';
import { RegisterComponent } from './Auth Components/register/register.component';
import { ServiceListComponent } from './service-list/service-list.component';
import { BookingComponent } from './booking/booking.component';
import { authGuard } from './auth.guard';
import { MyBookingsComponent } from './my-bookings/my-bookings.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
  { path: '', component: SearchComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'services', component: ServiceListComponent },
  {
    path: 'booking/:id',
    component: BookingComponent,
    canActivate: [authGuard],
  },
  {
    path: 'my-bookings',
    component: MyBookingsComponent,
    canActivate: [authGuard],
  },
  {path:'**',component:NotFoundComponent}
];
