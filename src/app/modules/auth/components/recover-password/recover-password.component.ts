import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {RecoverPasswordForm} from "../../../core/models/forms.model";
import {FormService} from "../../../core/services/form.service";

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrl: './recover-password.component.scss'
})
export class RecoverPasswordComponent {

  recoverPasswordForm!: FormGroup<RecoverPasswordForm>;

  constructor(private formService: FormService) {
    this.recoverPasswordForm = this.formService.initRecoverPasswordForm();
  }

  getErrorMessage(control: FormControl): string {
    return this.formService.getErrorMessage(control);
  }
}
