import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthServicesService } from '../../Services/auth-services.service';

export const authGuard: CanActivateFn = (route, state) => {
  const auth=inject(AuthServicesService);
  if(auth.hasRole('serviceProvider')){
    return true;
  }else{
    auth.logout();
    alert('You Are Not Authorized To Access This page. Please log in as an Service Provider.');
    return false;
  }
};
