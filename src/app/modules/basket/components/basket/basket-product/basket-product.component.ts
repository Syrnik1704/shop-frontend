import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BasketProduct} from "../../../../core/models/basket.model";
import {BasketService} from "../../../../core/services/basket.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-basket-product',
  templateUrl: './basket-product.component.html',
  styleUrl: './basket-product.component.scss'
})
export class BasketProductComponent {
  @Input() basketView = true;
  @Input() basketProduct!: BasketProduct;
  @Output() deleteProductUid = new EventEmitter<string>();

  constructor(
    private basketService: BasketService,
    private toastr: ToastrService
  ) {}

  deleteProductFromBasket() {
    this.basketService.deleteProductFromBasket(this.basketProduct.uid).subscribe({
      next: () => {
        this.toastr.success("Product has been deleted from basket", "SUCCESS");
        this.deleteProductUid.emit(this.basketProduct.uid);
      }, error: (err) => {
        this.toastr.error(`Product hasn't been deleted from basket, error occurred: ${err}`, "ERROR");
      }
    })
  }
}
