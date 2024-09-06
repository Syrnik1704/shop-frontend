import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {ActivateAccountComponent} from "./components/activate-account/activate-account.component";
import {RecoverPasswordComponent} from "./components/recover-password/recover-password.component";
import {ResetPasswordComponent} from "./components/reset-password/reset-password.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'activate/:uid', component: ActivateAccountComponent },
  { path: 'recover-password', component: RecoverPasswordComponent },
  { path: 'reset-password/:uid', component: ResetPasswordComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
