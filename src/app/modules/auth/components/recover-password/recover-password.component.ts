import {Component} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {RecoverPasswordForm} from "../../../core/models/forms.model";
import {FormService} from "../../../core/services/form.service";
import {AuthService} from "../../../core/services/auth.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrl: './recover-password.component.scss'
})
export class RecoverPasswordComponent {

  recoverPasswordForm!: FormGroup<RecoverPasswordForm>;
  isLoading: boolean = false;

  constructor(
    private formService: FormService,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.recoverPasswordForm = this.formService.initRecoverPasswordForm();
  }

  getErrorMessage(control: FormControl): string {
    return this.formService.getErrorMessage(control);
  }

  onPasswordRecover() {
    if (this.recoverPasswordForm.valid) {
      this.isLoading = true;
      this.authService.recoverPassword(this.recoverPasswordForm.getRawValue()).subscribe({
        next: () => {
          this.isLoading = false;
          this.toastr.success("If email address was correct, email message to reset password was sent", "SUCCESS")
        }, error: err => {
          this.isLoading = false;
          this.toastr.error(`Error occurred while password recovery: ${err}`, "ERROR");
        }
      });
    } else {
      this.toastr.error('Please fill out the form correctly', 'ERROR');
    }
  }
}
