import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {RegisterForm} from "../../../core/models/forms.model";
import {FormService} from "../../../core/services/form.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup<RegisterForm>;

  constructor(private formService: FormService) {}

  ngOnInit(): void {
    this.registerForm = this.formService.initRegisterForm();
  }

  get controls(): RegisterForm {
    return this.registerForm.controls;
  }

  getErrorMessage(control: FormControl): string {
    return this.formService.getErrorMessage(control);
  }

}
