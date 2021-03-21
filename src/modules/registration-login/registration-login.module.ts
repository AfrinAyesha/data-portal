import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RegistrationLoginMaterialModule } from './registration-login-material.module';
import { RegistrationLoginRoutingModule } from './registration-login-routing.module';

import { ApiService, ModuleConfig } from './services/api.service';
import { RegistrationComponent } from './components/registration/registration.component';
import { AgentRegisterComponent } from './components/agent-register/agent-register.component';
import { CustomerRegisterComponent } from './components/customer-register/customer-register.component';
import { NgxMaskModule } from 'ngx-mask';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './store/reducers';
import { effects } from './store/effects';
import { RegisterLoginSandbox } from './sandbox/registration-login.sandbox';
import { LoginComponent } from './components/login/login.component';
import { SharedModule } from '../shared/shared.module';

export { ModuleConfig };
export interface ModuleOptions {
  baseURL?: string;
  spaURL?: string;
}

export const FOR_ROOT_OPTIONS_TOKEN = new InjectionToken<ModuleOptions>(
  'forRoot() Module configuration'
);

@NgModule({
  declarations: [
    RegistrationComponent,
    AgentRegisterComponent,
    CustomerRegisterComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    RegistrationLoginMaterialModule,
    RegistrationLoginRoutingModule,
    SharedModule,
    NgxMaskModule.forRoot(),
    StoreModule.forFeature('registerLogin', reducers),
    EffectsModule.forFeature(effects),
  ],
})
export class RegistrationLoginModule {
  static forRoot(options?: ModuleOptions): ModuleWithProviders<RegistrationLoginModule> {
    return {
      ngModule: RegistrationLoginModule,
      providers: [
        ApiService,
        RegisterLoginSandbox,
        {
          provide: FOR_ROOT_OPTIONS_TOKEN,
          useValue: options,
        },
        {
          provide: ModuleConfig,
          useFactory: provideMyServiceOptions,
          deps: [FOR_ROOT_OPTIONS_TOKEN],
        },
      ],
    };
  }
}

export function provideMyServiceOptions(options?: ModuleOptions): ModuleConfig {
  const myServiceOptions = new ModuleConfig();
  if (options) {
    if (typeof options.baseURL === 'string') {
      myServiceOptions.baseURL = options.baseURL;
    }
    if (typeof options.spaURL === 'string') {
      myServiceOptions.spaURL = options.spaURL;
    }
  }
  return myServiceOptions;
}
