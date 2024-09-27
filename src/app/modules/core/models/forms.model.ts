import {FormArray, FormControl, FormGroup} from "@angular/forms";

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

export interface PostProduct {
  htmlDescription: FormControl<string>;
  price: FormControl<string>;
  name: FormControl<string>;
  category: FormControl<string>;
  mainDescription: FormControl<string>;
  parameters: FormArray<FormGroup<{ value: FormControl<string>; key: FormControl<string> }>>;
}


