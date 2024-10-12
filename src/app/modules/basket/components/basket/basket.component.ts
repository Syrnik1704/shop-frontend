import {Component, OnInit} from '@angular/core';
import {BasketProduct, GetBasketResponse} from "../../../core/models/basket.model";
import {BasketService} from "../../../core/services/basket.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss'
})
export class BasketComponent implements OnInit {

  basketProducts: BasketProduct[] = [];
  summaryPrice = 0;
  errorMessage: string | null = null;

  constructor(
    private basketService: BasketService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.basketService.getBasketProducts().subscribe({
      next: (resp) => {
        if (resp.body !== null) {
          const basketResponse = resp.body as GetBasketResponse;
          this.basketProducts = [...basketResponse.basketProducts];
          this.summaryPrice = basketResponse.summaryPrice;
        }
      },
      error: (err) => {
        this.errorMessage = err;
      },
    });
  }

  deleteProduct(uid: string) {
    this.basketProducts = this.basketProducts.filter(
      (product) => product.uid !== uid
    );
    this.summaryPrice = this.basketProducts.reduce((total, product) => {
      return total + product.summaryPrice;
    }, 0);
  }

  navigateToCreateOrder() {
    this.router.navigate(["order"], {
      relativeTo: this.route, state: {
        summaryPrice: this.summaryPrice
      }
    })
  }
}
