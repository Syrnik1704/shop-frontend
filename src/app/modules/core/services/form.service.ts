import {Injectable} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {
  AddCategoryForm,
  AddressForm,
  CustomerForm,
  DeliveryForm,
  LoginForm,
  PostProduct,
  RecoverPasswordForm,
  RegisterForm,
  ResetPasswordForm
} from "../models/forms.model";
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

  initAddCategoryForm(): FormGroup<AddCategoryForm> {
    return new FormGroup({
      name: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
    });
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

  initAddProductForm(): FormGroup<PostProduct> {
    return new FormGroup({
      name: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      mainDescription: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      htmlDescription: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      price: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      category: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      parameters: new FormArray([
        new FormGroup({
          key: new FormControl('', {
            validators: [Validators.required],
            nonNullable: true,
          }),
          value: new FormControl('', {
            validators: [Validators.required],
            nonNullable: true,
          }),
        }),
      ]),
    });
  }

  initCustomerForm(): FormGroup<CustomerForm> {
    return new FormGroup({
      firstName: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      lastName: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
        nonNullable: true,
      }),
      phone: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(12),
          Validators.maxLength(12),
        ],
        nonNullable: true,
      }),
    });
  }

  initAddressForm(): FormGroup<AddressForm> {
    return new FormGroup({
      city: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      street: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      number: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      postCode: new FormControl('', {
        validators: [Validators.required, Validators.pattern(/^\d{2}-\d{3}$/)],
        nonNullable: true,
      }),
    });
  }

  initDeliveryForm(): FormGroup<DeliveryForm> {
    return new FormGroup({
      uid: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
    });
  }

}
