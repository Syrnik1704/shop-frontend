import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "../home/components/home/home.component";
import {BasketComponent} from "./components/basket/basket.component";
import {CreateOrderComponent} from "./components/create-order/create-order.component";

const routes: Routes = [
  {path: '', component: BasketComponent},
  {path: 'order', component: CreateOrderComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasketRoutingModule { }
