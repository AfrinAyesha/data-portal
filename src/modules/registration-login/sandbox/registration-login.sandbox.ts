import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromStore from '../store';

@Injectable()
export class RegisterLoginSandbox {
  public agentRegisterSuccessRate$ = this.store.pipe(select(fromStore.isAgentRegisterSuccessful));
  public showLoader$ = this.store.pipe(select(fromStore.isShowLoader));
  public agenterror$ = this.store.pipe(select(fromStore.GetAgentError));
  public isLoginSuccess$ = this.store.pipe(select(fromStore.isLoginSuccessful));
  public isLoading$ = this.store.pipe(select(fromStore.isLoading));
  public loginError$ = this.store.pipe(select(fromStore.GetLoginError));

  constructor(private store: Store<fromStore.RegisterLoginState>) {}

  public registerAgent(agentData) {
    this.store.dispatch(fromStore.registerAgent({ agentData }));
  }
  public login(loginData) {
    this.store.dispatch(fromStore.login({ loginData }));
  }
}
