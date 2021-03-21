import * as agentActions from '../actions/register.action';
import { createReducer, on, Action } from '@ngrx/store';

export interface AgentRegisterState {
  isAgentRegisterSuccess: null | boolean;
  showLoader: boolean;
  agentRegisterError: any;
}

export const initialAgentRegisterState: AgentRegisterState = {
  isAgentRegisterSuccess: null,
  showLoader: false,
  agentRegisterError: null,
};

const agentRegisterReducer = createReducer(
  initialAgentRegisterState,
  on(agentActions.registerAgent, (state) => ({
    ...state,
    showLoader: true,
    isAgentRegisterSuccess: false,
    agentRegisterError: null,
  })),
  on(agentActions.registerAgentSuccess, (state) => ({
    ...state,
    showLoader: false,
    isAgentRegisterSuccess: true,
    agentRegisterError: null,
  })),
  on(agentActions.registerAgentFail, (state, { agentRegisterError }) => ({
    ...state,
    showLoader: false,
    isAgentRegisterSuccess: false,
    agentRegisterError: agentRegisterError,
  }))
);

export function AgentRegisterReducer(state: AgentRegisterState | undefined, action: Action) {
  return agentRegisterReducer(state, action);
}
