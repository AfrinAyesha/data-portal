import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { switchMap, catchError, map } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';
import * as fromStore from '../../store';
import * as authActions from '../action/auth.action';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private store: Store<fromStore.AuthState>
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.refreshToken),
      switchMap(() => {
        return this.apiService.refreshToken().pipe(
          map((loginDataSuccess: any) => {
            window.sessionStorage.setItem('access_token', loginDataSuccess.access_token);
            return authActions.authLoginSuccess();
          }),
          catchError((loginDataError) => {
            console.log('error', loginDataError);
            return of(authActions.authLoginFail());
          })
        );
      })
    )
  );
}
