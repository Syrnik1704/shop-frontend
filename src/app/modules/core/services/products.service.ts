import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {
  AddProductData,
  GetProductsResponse,
  PostProductResponse,
  Product,
  SimpleProduct
} from "../models/product.model";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  apiUrl = `${environment.apiUrl}/product`;

  constructor(private httpClient: HttpClient) { }

  getProducts(
    pageIndex: number = 1,
    itemsPerPage: number = 5,
    name: string | null = null,
    sorting: string | null = null,
    order: string | null = null,
    category: string | null = null
  ): Observable<GetProductsResponse> {
    let params = new HttpParams()
      .append("_page", pageIndex)
      .append("_limit", itemsPerPage);

    if (name) {
      params = params.append("name_like", name);
    }

    if (sorting) {
      params = params.append("_sort", sorting);
    }

    if (order) {
      params = params.append("_order", order);
    }

    if (category) {
      params = params.append("_category", category);
    }

    return this.httpClient.get<SimpleProduct[]>(`${this.apiUrl}`, {
      observe: "response",
      params,
    }).pipe(
      map((response) => {
        if (!response.body) return { products: [], totalCount: 0 }
        const totalCount = Number(response.headers.get("X-Total-Count"));
        return { products: [...response.body], totalCount: totalCount }
      })
    );
  }

  getProduct(name: string, createdAt: string): Observable<Product[]> {
    const params = new HttpParams()
      .append("name_like", name)
      .append("creation_date", createdAt);
    return this.httpClient.get<Product[]>(`${this.apiUrl}`, {
      params
    })
  }

  addProduct(addProductData: AddProductData): Observable<PostProductResponse> {
    console.log(addProductData.mainDescription)
    return this.httpClient.post<PostProductResponse>(
      `${this.apiUrl}`,
      addProductData,
      {
        withCredentials: true,
      }
    );
  }

}
