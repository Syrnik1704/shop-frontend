import {Component, OnDestroy} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {RegisterForm} from "../../../core/models/forms.model";
import {FormService} from "../../../core/services/form.service";
import * as AuthActions from "../../store/auth.actions";
import {AppState} from "../../../../store/app.reducer";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {authLoadingSelector} from "../../store/auth.selectors";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnDestroy {

  registerForm!: FormGroup<RegisterForm>;
  loading$: Observable<boolean>;

  constructor(
    private formService: FormService,
    private store: Store<AppState>
  ) {
    this.registerForm = this.formService.initRegisterForm();
    this.loading$ = this.store.select(authLoadingSelector);
  }

  get controls(): RegisterForm {
    return this.registerForm.controls;
  }

  getErrorMessage(control: FormControl): string {
    return this.formService.getErrorMessage(control);
  }

  onRegister() {
    const {email, login, password, retypedPassword} = this.registerForm.getRawValue();
    if (password !== retypedPassword) {
      return;
    }
    this.store.dispatch(
      AuthActions.register({registerData: {login, email, password}})
    );
  }

  ngOnDestroy(): void {
    this.store.dispatch(AuthActions.clearError());
  }
}
