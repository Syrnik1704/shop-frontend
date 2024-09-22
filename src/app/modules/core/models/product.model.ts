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
