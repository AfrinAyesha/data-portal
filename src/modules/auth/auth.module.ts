import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ApiService, ModuleConfig } from './services/api.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers, effects } from './store';

export { ModuleConfig };
export interface ModuleOptions {
  baseURL?: string;
  spaURL?: string;
  refreshPath?: string;
}

export const FOR_ROOT_OPTIONS_TOKEN = new InjectionToken<ModuleOptions>(
  'forRoot() Module configuration'
);

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature(effects),
  ],
})
export class AuthModule {
  static forRoot(options?: ModuleOptions): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [
        ApiService,
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
    if (typeof options.refreshPath === 'string') {
      myServiceOptions.refreshPath = options.refreshPath;
    }
  }
  return myServiceOptions;
}
