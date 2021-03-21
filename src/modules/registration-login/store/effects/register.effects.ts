import { getParseErrors } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { switchMap, catchError, map } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';
import * as fromStore from '../../store';
import * as agentActions from '../actions/register.action';

@Injectable()
export class AgentRegisterEffects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private store: Store<fromStore.RegisterLoginState>
  ) {}

  agentRegistration$ = createEffect(() =>
    this.actions$.pipe(
      ofType(agentActions.registerAgent),
      switchMap(({ agentData }) => {
        return this.apiService.registerAgent(agentData).pipe(
          map((successData) => agentActions.registerAgentSuccess()),
          catchError((agentRegisterError) => {
            console.log('error', agentRegisterError);
            return of(
              agentActions.registerAgentFail({
                agentRegisterError: this.getError(agentRegisterError),
              })
            );
          })
        );
      })
    )
  );

  getError(error) {
    if (error.status >= 400 && error.status <= 499) {
      return error.error.message;
    } else if (error.status >= 500) {
      return 'Oops! Something went wrong. Please try again';
    } else {
      return error.error;
    }
  }
}
