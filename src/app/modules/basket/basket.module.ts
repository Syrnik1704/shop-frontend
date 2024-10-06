import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BasketRoutingModule } from './basket-routing.module';
import { BasketComponent } from './components/basket/basket.component';
import { BasketProductComponent } from './components/basket/basket-product/basket-product.component';
import { QuantityControlComponent } from './controles/quantity-control/quantity-control.component';
import {ReactiveFormsModule} from "@angular/forms";
import { InputOnlyNumberDirective } from './directives/input-only-number.directive';


@NgModule({
  declarations: [
    BasketComponent,
    BasketProductComponent,
    QuantityControlComponent,
    InputOnlyNumberDirective
  ],
  exports: [
    QuantityControlComponent
  ],
  imports: [
    CommonModule,
    BasketRoutingModule,
    ReactiveFormsModule
  ]
})
export class BasketModule { }
