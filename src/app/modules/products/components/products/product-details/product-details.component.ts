import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {ProductsService} from "../../../../core/services/products.service";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private productsService: ProductsService) { };

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((paramMap) => {
        const [name, creation_date] = (paramMap.get("id") as string).split("-");
        return this.productsService.getProduct(name, creation_date);
      })
    ).subscribe({
      next: (product) => {
        console.log(product);
      }
    })
  }


}
