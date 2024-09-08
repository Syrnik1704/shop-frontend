import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {RegisterForm} from "../../../core/models/forms.model";
import {FormService} from "../../../core/services/form.service";
import * as AuthActions from "../../store/auth.actions";
import {AppState} from "../../../../store/app.reducer";
import {Store} from "@ngrx/store";
import {Observable, Subscription, take} from "rxjs";
import {authErrorSelector, authLoadingSelector} from "../../store/auth.selectors";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit, OnDestroy {
  private errorMessageSubscription!: Subscription;
  registerForm!: FormGroup<RegisterForm>;
  errorMessage$: Observable<string | null>;
  loading$: Observable<boolean>;

  constructor(private formService: FormService, private store: Store<AppState>,
              private toastr: ToastrService) {
    this.registerForm = this.formService.initRegisterForm();
    this.errorMessage$ = this.store.select(authErrorSelector);
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
    console.log(email, login, password, retypedPassword);
    if (password !== retypedPassword) {
      return;
    }
    console.log(AuthActions.register({registerData: {login, email, password}}))
    this.store.dispatch(
      AuthActions.register({registerData: {login, email, password}})
    );
  }

  ngOnInit(): void {
    this.errorMessageSubscription = this.errorMessage$.subscribe((message: string | null) => {
      if (message) {
        this.toastr.error(message, "ERROR");
      }
    });
  }

  ngOnDestroy(): void {
    this.errorMessageSubscription.unsubscribe();
    this.store.dispatch(AuthActions.clearError());
  }
}
