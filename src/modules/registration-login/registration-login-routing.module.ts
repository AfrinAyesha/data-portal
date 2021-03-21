import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { combineLatest } from 'rxjs';
import { AgentRegisterComponent } from './components/agent-register/agent-register.component';
import { CustomerRegisterComponent } from './components/customer-register/customer-register.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';

const routes: Routes = [
  {
    path: 'register',
    component: RegistrationComponent,
    children: [
      {
        path: 'agent',
        component: AgentRegisterComponent,
      },
      {
        path: 'customer',
        component: CustomerRegisterComponent,
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrationLoginRoutingModule {}
