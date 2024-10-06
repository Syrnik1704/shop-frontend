import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {ProductsService} from "../../../../core/services/products.service";
import {Product} from "../../../../core/models/product.model";
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {

  quantityControl = new FormControl(1);
  product: Product | null  = null;
  parameters: { [key: string]: string } | null = null;
  htmlContent: null | SafeHtml = null;


  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private sanitizer: DomSanitizer) {
    this.product = null;
  };

  ngOnInit() {

    this.route.paramMap.pipe(
      switchMap((paramMap) => {
        const [name, creation_date] = (paramMap.get("id") as string).split("-");
        return this.productsService.getProduct(name, creation_date);
      })
    ).subscribe({
      next: (product) => {
        // @ts-ignore
        this.product = { ...product } ;
        // @ts-ignore
        this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(product.htmlDescription);
        try {
          // @ts-ignore
          this.parameters = JSON.parse(product.parameters);
        } catch (e) {
          this.parameters = null;
          console.log(e)
        }
      }
    })
  }

  addToBasket() {
    console.log(this.quantityControl.value);
  }

}
