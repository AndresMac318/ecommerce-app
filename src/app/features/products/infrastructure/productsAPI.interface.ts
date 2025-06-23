import { Observable } from 'rxjs';
import { ProductDomain } from '../domain/productDomain.model';
import { ProductFilters } from '../+state/product.state';

export interface IProductAPIService {
  getAllProducts(): Observable<ProductDomain[]>;
  getProductsPaginated(
    page: number,
    pageSize: number,
    filters?: ProductFilters
  ): Observable<{
    products: ProductDomain[];
    totalItems: number;
    cacheKey: string;
  }>;
  getProductById(userId: string): Observable<ProductDomain>;

  updateProductStock(id: string, stock: number): Observable<ProductDomain>;
}
