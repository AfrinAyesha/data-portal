import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthModule } from 'src/modules/auth/auth.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomSerializer, reducers } from './store';
import { HttpReqResInterceptor } from 'src/modules/auth/http-req-res.interceptor';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { ApiService } from './services/api.service';
import { environment } from 'src/environments/environment';

const env = {
  developement: true,
  production: false,
};

export function ModuleConfigFactory(): AuthModule {
  return {
    baseURL: environment.baseURL,
    spaURL: environment.spaURL,
    refreshPath: environment.refreshPath,
    refreshTokenTimeoutInMs: environment.refreshTokenTimeoutInMs,
  };
}

@NgModule({
  declarations: [AppComponent, HeaderComponent, HomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot(),
    AuthModule.forRoot(),
    env.developement ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [
    ApiService,
    {
      provide: RouterStateSerializer,
      useClass: CustomSerializer,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpReqResInterceptor,
      multi: true,
    },
    {
      provide: AuthModule,
      useFactory: ModuleConfigFactory,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
