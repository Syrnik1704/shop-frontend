import {ServerResponse} from "./server-response.model";

export interface BasketProduct {
  uid: string;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
  summaryPrice: number;
}

export interface GetBasketResponse {
  basketProducts: BasketProduct[];
  summaryPrice: number;
}

export interface PostBasketBody {
  product: string; // product uid
  quantity: number;
}

export interface BasketResponse {
  body: ServerResponse | GetBasketResponse | null;
  totalCount: number;
}
