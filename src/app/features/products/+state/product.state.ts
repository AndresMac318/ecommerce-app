import { ProductDomain } from '../domain/productDomain.model';

export interface ProductState {
  products: ProductDomain[];
  loading: boolean;
  error: string | null;
  currentProduct: ProductDomain | null;
  filters: ProductFilters;
  pagination: ProductPagination;
}

export interface ProductFilters {
  category?: string | null;
  priceRange?: [number, number] | null;
}

export interface ProductPagination {
  currentPage: number;
  pageSize: number;
  totalItems: number;
}
