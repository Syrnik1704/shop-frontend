import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ResetPasswordForm} from "../../../core/models/forms.model";
import {FormService} from "../../../core/services/form.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../core/services/auth.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm!: FormGroup<ResetPasswordForm>;
  uid = "";

  constructor(private formService: FormService, private route: ActivatedRoute,
              private authService: AuthService, private toastr: ToastrService,
              private router: Router) {
    this.resetPasswordForm = this.formService.initResetPasswordForm();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        this.uid = params.get("uid") as string;
      }
    })
  }

  get controls(): ResetPasswordForm {
    return this.resetPasswordForm.controls;
  }

  getErrorMessage(control: FormControl): string {
    const error = this.formService.getErrorMessage(control);
    this.toastr.error(`${error}`, "ERROR");
    return error;
  }

  onPasswordReset() {
    const {password, retypedPassword} = this.resetPasswordForm.getRawValue();
    if (password === retypedPassword) {
      this.authService.resetPassword({password: password, uid: this.uid}).subscribe({
        next: () => {
          this.router.navigate(["/login"]);
          this.toastr.success("Password changed successfully", "SUCCESS");
        }, error: err => {
          this.toastr.error(`Error occurred while password reset: ${err}`, "ERROR");
        }
      })
    }
  }
}
