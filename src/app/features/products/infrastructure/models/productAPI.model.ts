export interface ProductPaginatedAPIResponse {
  first: number;
  prev: number | null;
  next: number;
  last: number;
  pages: number;
  items: number;
  data: ProductAPIResponse[];
}

export interface ProductAPIResponse {
  id: string;
  name: string;
  price: number;
  description: string;
  imageURL: string;
  category: string;
  stock: number;
  sale: false;
  sale_price: number;
}

