import { Component } from '@angular/core';
import {CustomerForm} from "../../../../core/models/forms.model";
import {FormControl, FormGroup} from "@angular/forms";
import {FormService} from "../../../../core/services/form.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.scss'
})
export class CustomerFormComponent {
  customerForm: FormGroup<CustomerForm>;

  constructor(private formService: FormService, private toastr: ToastrService) {
    this.customerForm = this.formService.initCustomerForm();
  }

  get controls() {
    return this.customerForm.controls;
  }

  getErrorMessage(control: FormControl): string {
    const error = this.formService.getErrorMessage(control);
    this.toastr.error(`${error}`, "ERROR");
    return error;
  }
}
