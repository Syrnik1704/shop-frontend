import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './components/products/products.component';
import { ProductComponent } from './components/products/product/product.component';
import {MatPaginator} from "@angular/material/paginator";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatAutocompleteModule, MatOption} from "@angular/material/autocomplete";
import {MatButton} from "@angular/material/button";
import {MatSelect} from "@angular/material/select";
import { ProductDetailsComponent } from './components/products/product-details/product-details.component';
import { ImagesCarouselComponent } from './components/products/product-details/images-carousel/images-carousel.component';
import {BasketModule} from "../basket/basket.module";


@NgModule({
  declarations: [
    ProductsComponent,
    ProductComponent,
    ProductDetailsComponent,
    ImagesCarouselComponent
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
      MatButton,
      MatSelect,
      BasketModule
  ]
})
export class ProductsModule { }
