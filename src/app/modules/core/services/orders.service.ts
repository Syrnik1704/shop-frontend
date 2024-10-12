import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment.development";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {GetOrderResponse, GetOrdersResponse, PostOrderBody, PostOrderResponse} from "../models/order.model";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  apiUrl = `${environment.apiUrl}/order`;

  constructor(private http: HttpClient) {}

  addOrder(body: PostOrderBody): Observable<PostOrderResponse> {
    return this.http.post<PostOrderResponse>(`${this.apiUrl}`, body, {
        withCredentials: true,
      })
      .pipe(
        tap((resp) => {
          window.location.href = resp.redirectUri;
        })
      );
  }

  getOrder(uid: string): Observable<GetOrderResponse> {
    const params = new HttpParams().append('uid', uid);
    return this.http.get<GetOrderResponse>(`${this.apiUrl}`, {
      params,
    });
  }

  getOrders(): Observable<GetOrdersResponse[]> {
    return this.http.get<GetOrdersResponse[]>(`${this.apiUrl}`, {
      withCredentials: true,
    });
  }

}
