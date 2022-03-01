import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthSandbox } from 'src/modules/auth/sandbox/auth.sandbox';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  readonly subscriptions: Array<Subscription> = [];
  isAccessTokenActive = false;
  refreshInterval: any = () => {};

  constructor(private authSandbox: AuthSandbox, private router: Router) {}
  ngOnInit() {
    console.log('called gain');
    this.subscriptions.push(
      this.authSandbox.isLoggedIn$.subscribe((isLoggedIn) => {
        if (isLoggedIn) {
          this.initiateRefreshTasks();
        }
      })
    );
  }
  async initiateRefreshTasks() {
    await this.initateIntervalsforRefresh();
    await this.attachEventListeners();
  }

  initateIntervalsforRefresh() {
    this.refreshInterval = setInterval(() => {
      if (this.isAccessTokenActive) {
        this.isAccessTokenActive = false;
        this.authSandbox.refreshToken();
      }
    }, environment.refreshTokenTimeoutInMs);
  }

  attachEventListeners = () => {
    window.addEventListener('scroll', this.setToActive, true);
    window.addEventListener('click', this.setToActive, true);
  };
  setToActive = (event) => {
    if (!this.isAccessTokenActive) {
      this.isAccessTokenActive = true;
    }
  };
  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    clearInterval(this.refreshInterval);
    window.removeEventListener('scroll', this.setToActive, true);
    window.removeEventListener('click', this.setToActive, true);
  }
}
