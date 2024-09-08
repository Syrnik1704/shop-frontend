import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormService} from "../../../core/services/form.service";
import {FormControl, FormGroup} from "@angular/forms";
import {LoginForm} from "../../../core/models/forms.model";
import * as AuthActions from "../../store/auth.actions";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../store/app.reducer";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnDestroy {
  loginForm!: FormGroup<LoginForm>;

  constructor(private formService: FormService, private store: Store<AppState>) {
    this.loginForm = this.formService.initLoginForm();
  }

  get controls(): LoginForm {
    return this.loginForm.controls;
  }

  getErrorMessage(control: FormControl): string {
    return this.formService.getErrorMessage(control);
  }

  onLogin() {
    this.store.dispatch(
      AuthActions.login({
        loginData: this.loginForm.getRawValue()
      })
    )
  }

  ngOnDestroy(): void {
    this.store.dispatch(AuthActions.clearError());
  }
}
