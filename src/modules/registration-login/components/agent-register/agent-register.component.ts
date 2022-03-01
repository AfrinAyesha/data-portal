import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';
import { RegisterLoginSandbox } from '../../sandbox/registration-login.sandbox';

@Component({
  selector: 'app-agent-register',
  templateUrl: './agent-register.component.html',
  styleUrls: ['./agent-register.component.scss'],
})
export class AgentRegisterComponent implements OnInit, OnDestroy {
  agentForm: any;
  showPass = false;
  showConfirmPass = false;
  showLoader = false;
  isRegisterSuccess = false;
  error = null;
  showBanner = false;
  readonly subscriptions: Array<Subscription> = [];
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
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private sandbox: RegisterLoginSandbox
  ) {}

  ngOnInit(): void {
    this.agentForm = this.fb.group(
      {
        fullname: ['', [Validators.required, Validators.pattern('^([A-Za-z\\s]{5,25})$')]],
        username: ['', [Validators.required, Validators.pattern('^([A-Za-z0-9._-]{5,25})$')]],
        password: ['', [Validators.required, Validators.pattern('^([A-Za-z0-9*$@._-]{8,25})$')]],
        confirmPassword: ['', [Validators.required]],
        email: [
          '',
          [
            Validators.required,
            Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,4}$'),
          ],
        ],
        commisionPercentage: ['', [Validators.required, Validators.max(100), Validators.min(1)]],
      },
      {
        validator: this.passwordMatcher('password', 'confirmPassword'),
      }
    );
    this.subscriptions.push(
      this.sandbox.showLoader$.subscribe((data) => {
        this.showLoader = data;
      })
    );
    this.subscriptions.push(
      this.sandbox.agentRegisterSuccessRate$.subscribe((isSuccess) => {
        this.isRegisterSuccess = isSuccess;
        if (this.isRegisterSuccess) {
          this.router.navigateByUrl('/login');
        }
      })
    );
    this.subscriptions.push(
      this.sandbox.agenterror$.subscribe((error) => {
        this.error = error;
        if (this.error !== null) {
          this.bannerData[0].input = this.error;
          this.showBanner = true;
        } else {
          this.showBanner = false;
        }
      })
    );
  }
  passwordMatcher(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
  isNumber(event) {
    if (event.keyCode >= 48 && event.keyCode <= 57) {
      return true;
    } else {
      return false;
    }
  }
  submit() {
    if (this.agentForm.valid) {
      const dataToSubmit = {};
      _.set(dataToSubmit, 'fullname', this.agentForm.value.fullname);
      _.set(dataToSubmit, 'username', this.agentForm.value.username);
      _.set(dataToSubmit, 'password', this.agentForm.value.password);
      _.set(dataToSubmit, 'email', this.agentForm.value.email);
      _.set(dataToSubmit, 'commision_percentage', this.agentForm.value.commisionPercentage);
      // console.log('data', dataToSubmit);
      this.sandbox.registerAgent(dataToSubmit);
    }
  }
  bannerClosed(e) {
    console.log('banner closed', e);
  }
  cancel() {
    this.agentForm.reset();
    this.router.navigate(['../'], { relativeTo: this.activateRoute });
  }
  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
