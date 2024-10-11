import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BasketRoutingModule } from './basket-routing.module';
import { BasketComponent } from './components/basket/basket.component';
import { BasketProductComponent } from './components/basket/basket-product/basket-product.component';
import { QuantityControlComponent } from './controles/quantity-control/quantity-control.component';
import {ReactiveFormsModule} from "@angular/forms";
import { InputOnlyNumberDirective } from './directives/input-only-number.directive';
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import { CreateOrderComponent } from './components/create-order/create-order.component';
import { CustomerFormComponent } from './components/create-order/customer-form/customer-form.component';
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import { PhoneControlComponent } from './controles/phone-control/phone-control.component';


@NgModule({
  declarations: [
    BasketComponent,
    BasketProductComponent,
    QuantityControlComponent,
    InputOnlyNumberDirective,
    CreateOrderComponent,
    CustomerFormComponent,
    PhoneControlComponent
  ],
  exports: [
    QuantityControlComponent
  ],
  imports: [
    CommonModule,
    BasketRoutingModule,
    ReactiveFormsModule,
    MatIcon,
    MatButton,
    MatTooltip,
    MatFormField,
    MatInput,
    MatError,
    MatLabel
  ]
})
export class BasketModule { }
