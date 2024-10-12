import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './components/orders/orders.component';
import { OrderComponent } from './components/order/order.component';
import {BasketModule} from "../basket/basket.module";
import {MatList, MatListItem} from "@angular/material/list";
import {MatDivider} from "@angular/material/divider";
import {MatButton} from "@angular/material/button";


@NgModule({
  declarations: [
    OrdersComponent,
    OrderComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    BasketModule,
    MatListItem,
    MatDivider,
    MatList,
    MatButton
  ]
})
export class OrdersModule { }
