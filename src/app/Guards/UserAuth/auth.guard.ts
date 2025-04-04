import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthServicesService } from '../../Services/auth-services.service';

export const userAuthGuard: CanActivateFn = (route, state) => {
const auth=inject(AuthServicesService);
  if(auth.hasRole('serviceUser')){
    return true;
  }else{
    auth.logout();
    alert('You Can Not Access This Page Directly. Please Login First');
    return false;
  }
};
