import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ModuleConfig } from '../services/api.service';
import * as fromStore from '../store';

@Injectable()
export class AuthGuard implements CanActivate {
  options: ModuleConfig;
  constructor(
    private store: Store<fromStore.AuthState>,
    options: ModuleConfig,
    private router: Router
  ) {
    this.options = options;
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.select(fromStore.isLoggedIn).pipe(
      map((loggedIn) => {
        if (!loggedIn) {
          const access_token = sessionStorage.getItem('access_token');
          if (access_token != null) {
            this.store.dispatch(fromStore.refreshToken());
            return true;
          } else {
            this.router.navigateByUrl('/auth/login');
          }
        } else {
          return true;
        }
      })
    );
  }
}
