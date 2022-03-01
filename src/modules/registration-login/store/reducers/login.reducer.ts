import * as agentActions from '../actions/login.action';
import { createReducer, on, Action } from '@ngrx/store';

export interface LoginState {
  isLoginSuccess: null | boolean;
  isLoading: null | boolean;
  LoginError: any;
}

export const initialAgentRegisterState: LoginState = {
  isLoginSuccess: null,
  isLoading: false,
  LoginError: null,
};

const loginReducer = createReducer(
  initialAgentRegisterState,
  on(agentActions.login, (state) => ({
    ...state,
    isLoginSuccess: null,
    isLoading: true,
    LoginError: null,
  })),
  on(agentActions.loginSuccess, (state) => ({
    ...state,
    isLoginSuccess: true,
    isLoading: false,
    LoginError: null,
  })),
  on(agentActions.loginFail, (state, { loginDataError }) => ({
    ...state,
    isLoginSuccess: false,
    isLoading: false,
    LoginError: loginDataError,
  }))
);

export function LoginReducer(state: LoginState | undefined, action: Action) {
  return loginReducer(state, action);
}
