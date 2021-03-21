import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromAgentRegister from './register.reducers';

export interface RegisterLoginState {
  register: fromAgentRegister.AgentRegisterState;
}

export const reducers: ActionReducerMap<RegisterLoginState> = {
  register: fromAgentRegister.AgentRegisterReducer,
};

export const selectRegisterState = createFeatureSelector<RegisterLoginState>('registerLogin');
