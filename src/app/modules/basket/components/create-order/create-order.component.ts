import {Component, OnInit, ViewChild} from '@angular/core';
import {Location} from '@angular/common'
import {Router} from "@angular/router";
import {CustomerFormComponent} from "./customer-form/customer-form.component";
import {AddressFormComponent} from "./address-form/address-form.component";
import {DeliveryFormComponent} from "./delivery-form/delivery-form.component";
import {OrdersService} from "../../../core/services/orders.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrl: './create-order.component.scss'
})
export class CreateOrderComponent implements OnInit {

  errorMsg: null | string = null;

  @ViewChild(CustomerFormComponent) customerFormComponent!: CustomerFormComponent;
  @ViewChild(AddressFormComponent) addressFormComponent!: AddressFormComponent;
  @ViewChild(DeliveryFormComponent) deliveryFormComponent!: DeliveryFormComponent;

  constructor(private location: Location,
              private router: Router,
              private ordersService: OrdersService,
              private toastr: ToastrService) {}

  ngOnInit() {
    const locationState = this.location.getState() as {
        summaryPrice: undefined | number;
        navigationId: number;
    }
    if (!locationState.summaryPrice) {
      this.router.navigate(['/']);
    }
  }

  order() {
    if (
      this.customerFormComponent.customerForm.valid &&
      this.addressFormComponent.addressForm.valid &&
      this.deliveryFormComponent.deliveryForm.valid
    ) {
      this.ordersService
        .addOrder({
          address: this.addressFormComponent.addressForm.getRawValue(),
          deliver: this.deliveryFormComponent.deliveryForm.getRawValue(),
          customerDetails: this.customerFormComponent.customerForm.getRawValue(),
        })
        .subscribe({
          error: (err) => {
            this.errorMsg = err;
            this.toastr.error(`Error occurred while adding order: ${err}`, "ERROR");
          },
        });
    } else {
      this.toastr.error(`The form is not completed as it should be. Please check correctness of each field and if delivery type is chosen`, "ERROR");
    }
  }

}
