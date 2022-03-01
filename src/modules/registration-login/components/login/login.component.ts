import { ThrowStmt } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RegisterLoginSandbox } from '../../sandbox/registration-login.sandbox';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  showPass = false;
  loginForm: any;
  isLoginSuccess = null;
  showBanner = false;
  showLoader = false;
  bannerProperties = {
    visualProperties: {
      backgroundColor: '#ab0742',
      stickyPosition: 'bottom',
    },
    actionProperties: {
      canDismiss: true,
      autoDismiss: false, // true if candismss is false
      autoDismissDuration: 3000, // mand field if autodismiss is false
      dismissButtonPosition: 'right', // mad fiend if canDismiss is true
      additionalActionButton: false,
      additionActionButtonText: 'DOWNLOAD', // mand field if addtionalactionbutto s true
    },
  };
  bannerData = [
    {
      type: 'text',
      input: 'Please try again!',
      color: '#ffffff',
      fontWeight: 600,
    },
  ];
  readonly subscriptions: Array<Subscription> = [];
  constructor(
    private fb: FormBuilder,
    private sandbox: RegisterLoginSandbox,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.pattern('^([A-Za-z0-9._-]{5,25})$')]],
      password: ['', [Validators.required, Validators.pattern('^([A-Za-z0-9*$@._-]{8,25})$')]],
    });
    this.subscriptions.push(
      this.sandbox.isLoginSuccess$.subscribe((data) => {
        this.isLoginSuccess = data;
        if (this.isLoginSuccess) {
          this.router.navigateByUrl('/home');
        }
      })
    );
    this.subscriptions.push(
      this.sandbox.loginError$.subscribe((data) => {
        if (data !== null) {
          this.bannerData[0].input = data;
          this.showBanner = true;
        } else {
          this.showBanner = false;
        }
      })
    );
    this.subscriptions.push(
      this.sandbox.isLoading$.subscribe((data) => {
        this.showLoader = data;
      })
    );
  }
  signIn() {
    console.log('submit', this.loginForm);
    if (this.loginForm.valid) {
      this.sandbox.login(this.loginForm.value);
    }
  }
  bannerClosed(e) {
    console.log('banner closed', e);
  }
  ngOnDestroy() {
    this.subscriptions.forEach((data) => data.unsubscribe());
  }
}
