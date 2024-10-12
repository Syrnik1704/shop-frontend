import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {ProductsService} from "../../../../core/services/products.service";
import {Product} from "../../../../core/models/product.model";
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {FormControl} from "@angular/forms";
import {BasketService} from "../../../../core/services/basket.service";
import {ToastrService} from "ngx-toastr";
import {PostBasketBody} from "../../../../core/models/basket.model";

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
    private sanitizer: DomSanitizer,
    private basketService: BasketService,
    private toastr: ToastrService
  ) {
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
    const body: PostBasketBody = {
      product: this.product!.uid,
      quantity: Number(this.quantityControl.value),
    };
    this.basketService.addProductToBasket(body).subscribe({
      next: () => {
        this.toastr.success("Products have been added to basket", "SUCCESS");
      },
      error: (err) => {
        this.toastr.warning(`Products haven't been added to basket, something went wrong: ${err}`, "WARNING");
      },
    });

  }

}
