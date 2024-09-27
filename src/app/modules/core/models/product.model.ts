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

export interface AddProductData {
  name: string;
  mainDescription: string;
  htmlDescription: string;
  price: number;
  imagesUid: string[];
  parameters: string;
  category: string;
}

export interface PostProductResponse {
  timestamp: string;
  message: string;
}

