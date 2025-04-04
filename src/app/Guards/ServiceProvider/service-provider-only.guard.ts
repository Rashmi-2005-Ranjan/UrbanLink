import { CanMatchFn } from '@angular/router';

export const serviceProviderOnlyGuard: CanMatchFn = (route, segments) => {
  return true;
};
