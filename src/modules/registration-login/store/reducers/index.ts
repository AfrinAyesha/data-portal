import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromAgentRegister from './register.reducers';
import * as fromLogin from './login.reducer';

export interface RegisterLoginState {
  register: fromAgentRegister.AgentRegisterState;
  login: fromLogin.LoginState;
}

export const reducers: ActionReducerMap<RegisterLoginState> = {
  register: fromAgentRegister.AgentRegisterReducer,
  login: fromLogin.LoginReducer,
};

export const selectRegisterState = createFeatureSelector<RegisterLoginState>('registerLogin');
