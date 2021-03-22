import * as authActions from '../action/auth.action';
import { createReducer, on, Action } from '@ngrx/store';

export interface AuthenticationState {
  loggedIn: boolean;
}

export const initialAuthenticationState: AuthenticationState = {
  loggedIn: false,
};

const authLoginReducer = createReducer(
  initialAuthenticationState,
  on(authActions.authLoginSuccess, (state) => ({
    ...state,
    loggedIn: true,
  })),
  on(authActions.authLoginFail, (state) => ({
    ...state,
    loggedIn: false,
  }))
);

export function AuthLoginReducer(state: AuthenticationState | undefined, action: Action) {
  return authLoginReducer(state, action);
}
