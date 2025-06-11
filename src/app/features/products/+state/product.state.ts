import { ProductDomain } from '../domain/productDomain.model';

export interface ProductState {
  cache: Record<
    string,
    {
      data: ProductDomain[];
      timestamp: number;
    }
  >;
  currentPageData: ProductDomain[];
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
