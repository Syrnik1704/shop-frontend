import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './components/products/products.component';
import { ProductComponent } from './components/products/product/product.component';
import {MatPaginator} from "@angular/material/paginator";
import {AppModule} from "../../app.module";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {
  MatAutocomplete,
  MatAutocompleteModule,
  MatAutocompleteTrigger,
  MatOption
} from "@angular/material/autocomplete";
import {MatButton} from "@angular/material/button";


@NgModule({
  declarations: [
    ProductsComponent,
    ProductComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    MatPaginator,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatOption,
    MatButton
  ]
})
export class ProductsModule { }
