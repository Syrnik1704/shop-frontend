import {FormControl} from "@angular/forms";

export interface LoginForm {
  login: FormControl<string>;
  password: FormControl<string>;
}

export interface RegisterForm {
  email: FormControl<string>;
  login: FormControl<string>;
  password: FormControl<string>;
  retypedPassword: FormControl<string>;
}

export interface RecoverPasswordForm {
  email: FormControl<string>;
}

export interface ResetPasswordForm {
  password: FormControl<string>;
  retypedPassword: FormControl<string>;
}

export interface AddCategoryForm {
  name: FormControl<string>;
}

