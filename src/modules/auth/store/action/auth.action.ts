import { createAction, props } from '@ngrx/store';

export const authLoginSuccess = createAction('[ Login Effects] Auth Login Success');

export const authLoginFail = createAction('[ Login Effects] Auth Login Fail');

export const refreshToken = createAction('[Auth] Refresh Token');
