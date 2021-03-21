import { createAction, props } from '@ngrx/store';

export const registerAgent = createAction(
  '[Agent Register] Register Agent Details',
  props<{ agentData: any }>()
);

export const registerAgentSuccess = createAction('[Register Effects] Agent register successful');
export const registerAgentFail = createAction(
  '[Register Effects] Agent register Failed',
  props<{ agentRegisterError: any }>()
);
