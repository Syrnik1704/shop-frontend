import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {ProductsService} from "../../../../core/services/products.service";
import {Product} from "../../../../core/models/product.model";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
  product: Product | null  = null;
  parameters: { [key: string]: string } | null = null;


  constructor(private route: ActivatedRoute, private productsService: ProductsService) {
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
        console.log(product);
        // @ts-ignore
        this.product = { ...product };
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


}
