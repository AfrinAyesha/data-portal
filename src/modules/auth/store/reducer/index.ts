import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromAuth from './auth.reducer';

export interface AuthState {
  auth: fromAuth.AuthenticationState;
}

export const reducers: ActionReducerMap<AuthState> = {
  auth: fromAuth.AuthLoginReducer,
};

export const getAuthState = createFeatureSelector<AuthState>('auth');
