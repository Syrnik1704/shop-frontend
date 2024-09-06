import {Component, OnInit} from '@angular/core';
import {FormService} from "../../../core/services/form.service";
import {FormControl, FormGroup} from "@angular/forms";
import {LoginForm, RegisterForm} from "../../../core/models/forms.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup<LoginForm>;

  constructor(private formService: FormService) {}

  ngOnInit(): void {
    this.loginForm = this.formService.initLoginForm();
  }

  get controls(): LoginForm {
    return this.loginForm.controls;
  }

  getErrorMessage(control: FormControl): string {
    return this.formService.getErrorMessage(control);
  }
}
