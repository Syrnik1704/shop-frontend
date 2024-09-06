import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export const matchPasswordsValidator = (passwordControlName: string, retypedPasswordControlname: string):
  ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const passwordControl = control.get(passwordControlName);
    const retypedPasswordControl = control.get(retypedPasswordControlname);

    if (retypedPasswordControl?.value && retypedPasswordControl?.value !== passwordControl?.value) {
      retypedPasswordControl.setErrors({
        passwordsMissmatched: true
      })
    }
    return null;
  }
}
