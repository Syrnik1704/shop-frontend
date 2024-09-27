import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./modules/auth/components/login/login.component";

const routes: Routes = [
  { path: '', loadChildren: () => import("./modules/home/home.module").then((m) => m.HomeModule) },
  { path: 'products', loadChildren: () => import("./modules/products/products.module").then((m) => m.ProductsModule) },
  { path: 'admin', loadChildren: () => import("./modules/administration/administration.module").then((m) => m.AdministrationModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
