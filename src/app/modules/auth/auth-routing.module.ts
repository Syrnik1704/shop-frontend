import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {ActivateAccountComponent} from "./components/activate-account/activate-account.component";
import {RecoverPasswordComponent} from "./components/recover-password/recover-password.component";
import {ResetPasswordComponent} from "./components/reset-password/reset-password.component";
import {unauthGuard} from "../core/guards/unauthorized.guard";

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [unauthGuard]},
  { path: 'register', component: RegisterComponent, canActivate: [unauthGuard] },
  { path: 'activate/:uid', component: ActivateAccountComponent, canActivate: [unauthGuard] },
  { path: 'recover-password', component: RecoverPasswordComponent, canActivate: [unauthGuard] },
  { path: 'reset-password/:uid', component: ResetPasswordComponent, canActivate: [unauthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
