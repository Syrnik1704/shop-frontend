export interface SimpleProduct {
  name: string;
  price: number;
  createdAt: string;
  imageUrls: string;
  mainDescription: string;
}

export interface GetProductsResponse {
  products: SimpleProduct[];
  totalCount: number;
}

export interface Product {
  name: string;
  price: number;
  createdAt: string;
  mainDescription: string;
  uid: string;
  active: boolean;
  htmlDescription: string;
  imageUrls: string[];
  parameters: string;
  categoryDTO: {
    name: string;
    shortId: string;
  }
}
