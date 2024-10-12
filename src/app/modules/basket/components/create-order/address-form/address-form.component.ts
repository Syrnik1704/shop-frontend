import {Component} from '@angular/core';
import {FormService} from "../../../../core/services/form.service";
import {FormControl, FormGroup} from "@angular/forms";
import {AddressForm} from "../../../../core/models/forms.model";

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrl: './address-form.component.scss'
})
export class AddressFormComponent {

  addressForm: FormGroup<AddressForm>;

  constructor(
    private formService: FormService
  ) {
    this.addressForm = this.formService.initAddressForm();
  }

  get controls() {
    return this.addressForm.controls;
  }

  getErrorMessage(control: FormControl) {
    return this.formService.getErrorMessage(control);
  }
}
