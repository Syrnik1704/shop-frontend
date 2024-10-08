import { Injectable } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginForm, RecoverPasswordForm, RegisterForm, ResetPasswordForm} from "../models/forms.model";
import {matchPasswordsValidator} from "../../auth/components/shared/validators/match-passwords.validator";

@Injectable({
  providedIn: 'root'
})
export class FormService {

  initLoginForm(): FormGroup<LoginForm> {
    return new FormGroup( {
      login: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true}),
      password: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true}),
    })
  }

  initRegisterForm(): FormGroup<RegisterForm> {
    return new FormGroup( {
      email: new FormControl('', {
        validators: [
          Validators.required,
          Validators.email
        ],
        nonNullable: true}),
      login: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(30)
        ],
        nonNullable: true}),
      password: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(50)
        ],
        nonNullable: true}),
      retypedPassword: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(50)
        ],
        nonNullable: true}),
    }, {validators: [matchPasswordsValidator("password", "retypedPassword")]})
  }

  initRecoverPasswordForm(): FormGroup<RecoverPasswordForm> {
    return new FormGroup({
      email: new FormControl('', {
        validators: [
          Validators.required,
          Validators.email
        ],
        nonNullable: true
      })
    })
  }

  initResetPasswordForm(): FormGroup<ResetPasswordForm> {
    return new FormGroup({
      password: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(50)
        ],
        nonNullable: true}),
      retypedPassword: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(50)
        ],
        nonNullable: true
      })
    }, {validators: [matchPasswordsValidator("password", "retypedPassword")]})
  }

  getErrorMessage(formControl: FormControl): string {
    if (formControl.hasError('required')) {
      return "This field is required";
    }
    if (formControl.hasError('minlength')) {
      return `Minimum length is ${formControl.errors?.["minlength"].requiredLength} characters`;
    }
    if (formControl.hasError('maxlength')) {
      return `Maximum length is ${formControl.errors?.["maxlength"].requiredLength} characters`;
    }
    if (formControl.hasError('email')) {
      return "Incorrect email address";
    }
    if (formControl.hasError("passwordsMissmatched")) {
      return "Retyped password doesn't match"
    }
    return "";
  }
}
