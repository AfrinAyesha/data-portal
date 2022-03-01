import { createSelector, MemoizedSelector } from '@ngrx/store';
import * as fromReducer from '../reducers';
import { LoginState } from '../reducers/login.reducer';

export const GetLoginState = createSelector(
  fromReducer.selectRegisterState,
  (state: fromReducer.RegisterLoginState) => state.login
);

const getLoginSuccess = (state: LoginState): boolean => {
  return state.isLoginSuccess === true;
};
const getIsLoading = (state: LoginState): boolean => {
  return state.isLoading === true;
};

export const isLoginSuccessful: MemoizedSelector<object, boolean> = createSelector(
  GetLoginState,
  getLoginSuccess
);

export const isLoading: MemoizedSelector<object, boolean> = createSelector(
  GetLoginState,
  getIsLoading
);

export const GetLoginError = createSelector(GetLoginState, (state) => {
  return state.LoginError;
});
