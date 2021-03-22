import * as agentActions from '../actions/login.action';
import { createReducer, on, Action } from '@ngrx/store';

export interface LoginState {
  isLoginSuccess: null | boolean;
  isLoginFailed: null | boolean;
  LoginError: any;
}

export const initialAgentRegisterState: LoginState = {
  isLoginSuccess: null,
  isLoginFailed: null,
  LoginError: null,
};

const loginReducer = createReducer(
  initialAgentRegisterState,
  on(agentActions.login, (state) => ({
    ...state,
    isLoginSuccess: null,
    isLoginFailed: null,
    LoginError: null,
  })),
  on(agentActions.loginSuccess, (state, { loginDataSuccess }) => ({
    ...state,
    isLoginSuccess: true,
    isLoginFailed: false,
    LoginError: null,
  })),
  on(agentActions.loginFail, (state, { loginDataError }) => ({
    ...state,
    isLoginSuccess: false,
    isLoginFailed: true,
    LoginError: loginDataError,
  }))
);

export function LoginReducer(state: LoginState | undefined, action: Action) {
  return loginReducer(state, action);
}
