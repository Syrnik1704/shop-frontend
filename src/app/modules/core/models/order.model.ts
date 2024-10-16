import {Customer} from "./customer.model";
import {Address} from "./address.model";
import {GetDelivery, PostDelivery} from "./delivery.model";
import {BasketProduct} from "./basket.model";

export interface PostOrderBody {
  customerDetails: Customer;
  address: Address;
  deliver: PostDelivery;
}

export interface PostOrderResponse {
  status: {
    statusCode: string;
  };
  redirectUri: string;
  orderId: string;
  extOrderId: string;
}

export interface GetOrderResponse {
  uid: string;
  orders: string;
  status: string;
  customerDetails: Customer;
  address: Address;
  deliver: GetDelivery;
  items: BasketProduct[];
  summaryPrice: number;
}

export interface GetOrdersResponse {
  uid: string;
  orders: string;
  status: string;
  customerDetails: Customer;
  address: Address;
  deliver: GetDelivery;
}

