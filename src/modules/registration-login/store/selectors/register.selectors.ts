import { createSelector, MemoizedSelector } from '@ngrx/store';
import * as fromReducer from '../reducers';
import { AgentRegisterState } from '../reducers/register.reducers';

export const RegisterState = createSelector(
  fromReducer.selectRegisterState,
  (state: fromReducer.RegisterLoginState) => state.register
);

// export const selectRegisterState = (state: fromReducer.RegisterLoginState) => state.register;

const getAgentRegisterSuccess = (state: AgentRegisterState): boolean => {
  return state.isAgentRegisterSuccess === true;
};

const getShowLoader = (state: AgentRegisterState): boolean => {
  return state.showLoader === true;
};

export const isAgentRegisterSuccessful: MemoizedSelector<object, boolean> = createSelector(
  RegisterState,
  getAgentRegisterSuccess
);

export const isShowLoader: MemoizedSelector<object, boolean> = createSelector(
  RegisterState,
  getShowLoader
);

export const GetAgentError = createSelector(RegisterState, (state) => {
  return state.agentRegisterError;
});
