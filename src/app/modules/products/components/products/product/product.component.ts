import { Component, Input } from '@angular/core';
import {SimpleProduct} from "../../../../core/models/product.model";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  @Input() product!: SimpleProduct;
}
