import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BasketRoutingModule } from './basket-routing.module';

import { BasketComponent } from './components/basket/basket.component';
import { BasketProductComponent } from './components/basket/basket-product/basket-product.component';
import { QuantityControlComponent } from './controles/quantity-control/quantity-control.component';
import { CreateOrderComponent } from './components/create-order/create-order.component';
import { CustomerFormComponent } from './components/create-order/customer-form/customer-form.component';
import { PhoneControlComponent } from './controles/phone-control/phone-control.component';
import { AddressFormComponent } from './components/create-order/address-form/address-form.component';
import { DeliveryFormComponent } from './components/create-order/delivery-form/delivery-form.component';

import { InputOnlyNumberDirective } from './directives/input-only-number.directive';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
  declarations: [
    BasketComponent,
    BasketProductComponent,
    QuantityControlComponent,
    InputOnlyNumberDirective,
    CreateOrderComponent,
    CustomerFormComponent,
    PhoneControlComponent,
    AddressFormComponent,
    DeliveryFormComponent
  ],
  exports: [
    QuantityControlComponent,
    BasketProductComponent
  ],
  imports: [
    CommonModule,
    BasketRoutingModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule
  ]
})
export class BasketModule { }
