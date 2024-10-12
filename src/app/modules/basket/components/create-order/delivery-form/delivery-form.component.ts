import {Component, OnInit} from '@angular/core';
import {FormService} from "../../../../core/services/form.service";
import {FormGroup} from "@angular/forms";
import {DeliveryForm} from "../../../../core/models/forms.model";
import {DeliveryService} from "../../../../core/services/delivery.service";
import {GetDelivery} from "../../../../core/models/delivery.model";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-delivery-form',
  templateUrl: './delivery-form.component.html',
  styleUrl: './delivery-form.component.scss'
})
export class DeliveryFormComponent implements OnInit {
  deliveryForm: FormGroup<DeliveryForm>;
  deliveryTypes: GetDelivery[] = [];
  errorMsg: string | null = null;

  constructor(
    private formService: FormService,
    private deliveryService: DeliveryService,
    private toastr: ToastrService
  ) {
    this.deliveryForm = this.formService.initDeliveryForm();
  }

  get controls() {
    return this.deliveryForm.controls;
  }

  ngOnInit(): void {
    this.deliveryService.getDelivery().subscribe({
      next: (delivery) => {
        this.deliveryTypes = [...delivery];
      },
      error: (err) => {
        this.errorMsg = err;
        this.toastr.error(`Error occurred while getting delivery types: ${err}`, "ERROR")
      }
    });
  }

}
