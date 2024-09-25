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

export interface Product extends Omit<SimpleProduct, "imageUrls"> {
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
