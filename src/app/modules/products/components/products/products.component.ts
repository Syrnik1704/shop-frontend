import { Component } from '@angular/core';
import {Product} from "../../../core/models/product.model";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  products: Product[] = [
    {
      uid: "1234",
      name: "product1",
      price: 200,
      imageUrl: "https://png.pngtree.com/element_our/20190529/ourlarge/pngtree-three-dimensional-bicycle-bicycle-mountain-bike-image_1195058.jpg",
      active: true,
      category: "category1",
      shortId: 12
    },
    {
      uid: "1234",
      name: "product1",
      price: 200,
      imageUrl: "https://png.pngtree.com/element_our/20190529/ourlarge/pngtree-three-dimensional-bicycle-bicycle-mountain-bike-image_1195058.jpg",
      active: true,
      category: "category1",
      shortId: 12
    },
    {
      uid: "1234",
      name: "product1",
      price: 200,
      imageUrl: "https://png.pngtree.com/element_our/20190529/ourlarge/pngtree-three-dimensional-bicycle-bicycle-mountain-bike-image_1195058.jpg",
      active: true,
      category: "category1",
      shortId: 12
    },
    {
      uid: "1234",
      name: "product1",
      price: 200,
      imageUrl: "https://png.pngtree.com/element_our/20190529/ourlarge/pngtree-three-dimensional-bicycle-bicycle-mountain-bike-image_1195058.jpg",
      active: true,
      category: "category1",
      shortId: 12
    },
    {
      uid: "1234",
      name: "product1",
      price: 200,
      imageUrl: "https://png.pngtree.com/element_our/20190529/ourlarge/pngtree-three-dimensional-bicycle-bicycle-mountain-bike-image_1195058.jpg",
      active: true,
      category: "category1",
      shortId: 12
    },
    {
      uid: "1234",
      name: "product1",
      price: 200,
      imageUrl: "https://png.pngtree.com/element_our/20190529/ourlarge/pngtree-three-dimensional-bicycle-bicycle-mountain-bike-image_1195058.jpg",
      active: true,
      category: "category1",
      shortId: 12
    },
    {
      uid: "1234",
      name: "product1",
      price: 200,
      imageUrl: "https://png.pngtree.com/element_our/20190529/ourlarge/pngtree-three-dimensional-bicycle-bicycle-mountain-bike-image_1195058.jpg",
      active: true,
      category: "category1",
      shortId: 12
    }
  ]
}
