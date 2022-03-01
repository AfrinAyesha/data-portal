import { createSelector, MemoizedSelector } from '@ngrx/store';
import * as fromReducer from '../reducer';

export const GetAuthState = createSelector(
  fromReducer.getAuthState,
  (state: fromReducer.AuthState) => state.auth
);
export const isLoggedIn = createSelector(GetAuthState, (state) => {
  return state.loggedIn;
});
