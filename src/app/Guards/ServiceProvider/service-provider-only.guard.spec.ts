import { TestBed } from '@angular/core/testing';
import { CanMatchFn } from '@angular/router';

import { serviceProviderOnlyGuard } from './service-provider-only.guard';

describe('serviceProviderOnlyGuard', () => {
  const executeGuard: CanMatchFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => serviceProviderOnlyGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
