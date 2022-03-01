import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthSandbox } from './sandbox/auth.sandbox';
import { ModuleConfig } from './services/api.service';
import * as fromStore from './store';

@Injectable()
export class HttpReqResInterceptor implements HttpInterceptor {
  options: ModuleConfig;
  constructor(
    private router: Router,
    private store: Store<fromStore.AuthState>,
    private activatedRoute: ActivatedRoute,
    private authSandbox: AuthSandbox,
    options: ModuleConfig
  ) {
    this.options = options;
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const access_token = window.sessionStorage.getItem('access_token');
    const refresh_token = window.sessionStorage.getItem('refresh_token');
    if (access_token != null) {
      request = request.clone({
        setHeaders: { Authorization: 'Bearer ' + access_token },
      });
    } else if (access_token === null && refresh_token !== null) {
      request = request.clone({
        setHeaders: { Authorization: 'Bearer ' + refresh_token },
      });
    }
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error && error.status === 401) {
          this.authSandbox.loginFail();
          //   this.store.dispatch(fromStore.authLoginFail);
          this.router.navigateByUrl('/auth/login');
        } else if (error && error.status === 403) {
          this.router.navigateByUrl('/auth/login');
        }
        return throwError(error);
      })
    );
  }
}
