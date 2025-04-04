import { CanDeactivateFn } from '@angular/router';
import { CanComponentDeactivate } from '../../Interfaces/canComponentDeactivate.interface';

export const unsavedChangesGuard: CanDeactivateFn<CanComponentDeactivate> = (
  component,
  currentRoute,
  currentState,
  nextState
) => {
  return component.canDeactivate() ? component.canDeactivate() : true;
};
