import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthRoutingModule} from './auth-routing.module';
import {LoginComponent} from './components/login/login.component';
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {RegisterComponent} from './components/register/register.component';
import {ActivateAccountComponent} from "./components/activate-account/activate-account.component";
import {RecoverPasswordComponent} from './components/recover-password/recover-password.component';
import {ResetPasswordComponent} from './components/reset-password/reset-password.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ActivateAccountComponent,
    RecoverPasswordComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatFormField,
    ReactiveFormsModule,
    MatInput,
    MatButton,
    MatLabel,
    MatError
  ]
})
export class AuthModule { }
