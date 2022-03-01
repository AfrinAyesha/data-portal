import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromStore from '../store';

@Injectable()
export class AuthSandbox {
  constructor(private store: Store<fromStore.AuthState>) {}
  public isLoggedIn$ = this.store.pipe(select(fromStore.isLoggedIn));

  public refreshToken() {
    return this.store.dispatch(fromStore.refreshToken());
  }
  public loginFail() {
    return this.store.dispatch(fromStore.authLoginFail());
  }
}
