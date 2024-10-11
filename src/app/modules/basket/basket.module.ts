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


@NgModule({
  declarations: [
    BasketComponent,
    BasketProductComponent,
    QuantityControlComponent,
    InputOnlyNumberDirective,
    CreateOrderComponent
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
    MatTooltip
  ]
})
export class BasketModule { }
