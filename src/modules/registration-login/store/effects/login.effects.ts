import { getParseErrors } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { switchMap, catchError, map } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';
import * as fromStore from '../../store';
import * as loginActions from '../actions/login.action';
import * as authActions from 'src/modules/auth/store/action/auth.action';

@Injectable()
export class LoginEffects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private store: Store<fromStore.RegisterLoginState>
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginActions.login),
      switchMap(({ loginData }) => {
        return this.apiService.login(loginData).pipe(
          map((loginDataSuccess: any) => {
            window.sessionStorage.setItem('access_token', loginDataSuccess.access_token);
            window.sessionStorage.setItem('refresh_token', loginDataSuccess.refresh_token);
            return loginActions.loginSuccess();
          }),
          catchError((loginDataError) => {
            console.log('error', loginDataError);
            return of(
              loginActions.loginFail({
                loginDataError: this.getError(loginDataError),
              })
            );
          })
        );
      })
    )
  );

  authlogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginActions.loginSuccess),
      map(() => authActions.authLoginSuccess())
    )
  );

  authloginfail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginActions.loginFail),
      map(() => authActions.authLoginFail())
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
