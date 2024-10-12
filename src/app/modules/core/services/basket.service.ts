import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment.development";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {HttpClient, HttpParams, HttpResponse} from "@angular/common/http";
import {BasketResponse, GetBasketResponse, PostBasketBody} from "../models/basket.model";
import {ServerResponse} from "../models/server-response.model";
import {map} from "rxjs/operators";


function extractResponse(response: HttpResponse<ServerResponse | GetBasketResponse>): BasketResponse {
  if (!response.body) return { body: null, totalCount: 0 };
  const totalCount = Number(response.headers.get('X-Total-Count'));
  return { body: { ...response.body }, totalCount };
}

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  apiUrl = `${environment.apiUrl}/basket`;

  totalCount$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  constructor(private http: HttpClient) {}

  addProductToBasket(body: PostBasketBody): Observable<BasketResponse> {
    return this.http
      .post<ServerResponse>(`${this.apiUrl}`, body, {
        withCredentials: true,
        observe: 'response',
      })
      .pipe(
        map(extractResponse),
        tap(({ totalCount }) => {
          this.totalCount$.next(totalCount);
        })
      );
  }

  deleteProductFromBasket(uid: string): Observable<BasketResponse> {
    const params = new HttpParams().append("uid", uid);
    return this.http
      .delete<ServerResponse>(`${this.apiUrl}`, {
        withCredentials: true,
        observe: 'response',
        params
      })
      .pipe(
        map(extractResponse),
        tap(({ totalCount }) => {
          this.totalCount$.next(totalCount);
        })
      );
  }

  getBasketProducts(): Observable<BasketResponse> {
    return this.http
      .get<GetBasketResponse>(`${this.apiUrl}`, {
        withCredentials: true,
        observe: 'response',
      })
      .pipe(
        map(extractResponse),
        tap(({ totalCount }) => {
          this.totalCount$.next(totalCount);
        })
      );
  }

}
