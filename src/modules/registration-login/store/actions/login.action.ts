import { createAction, props } from '@ngrx/store';

export const login = createAction('[ Login] Login Details', props<{ loginData: any }>());

export const loginSuccess = createAction(
  '[ Login Effects] Login Details Success',
  props<{ loginDataSuccess: any }>()
);

export const loginFail = createAction(
  '[ Login Effects] Login Details Fail',
  props<{ loginDataError: any }>()
);
