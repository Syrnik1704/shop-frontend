import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ResetPasswordForm} from "../../../core/models/forms.model";
import {FormService} from "../../../core/services/form.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm!: FormGroup<ResetPasswordForm>;

  constructor(private formService: FormService, private route: ActivatedRoute) {
    this.resetPasswordForm = this.formService.initResetPasswordForm();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        console.log(params.get("uid"));
      }
    })
  }

  get controls(): ResetPasswordForm {
    return this.resetPasswordForm.controls;
  }

  getErrorMessage(control: FormControl): string {
    return this.formService.getErrorMessage(control);
  }
}
