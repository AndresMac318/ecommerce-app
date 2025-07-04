import { Inject, Injectable } from '@angular/core';
import { ProductDomain } from '../domain/productDomain.model';
import { HTTP_PRODUCT_SERVICE } from '../infrastructure/providers/productAPI.provider';
import { IProductAPIService } from '../infrastructure/productsAPI.interface';
import { Observable } from 'rxjs';
import { ProductFilters } from '../+state/product.state';

@Injectable({ providedIn: 'root' })
export class ProductUseCaseService {
  constructor(
    @Inject(HTTP_PRODUCT_SERVICE) private productAPIService: IProductAPIService
  ) {}

  getProducts(): Observable<ProductDomain[]> {
    return this.productAPIService.getAllProducts();
  }

  getProductsPaginated(
    page: number,
    pageSize: number,
    filters?: ProductFilters
  ): Observable<{
    products: ProductDomain[];
    totalItems: number;
    cacheKey: string;
  }> {
    return this.productAPIService.getProductsPaginated(page, pageSize, filters);
  }

  updateProductStock(id: string, stock: number){
    return this.productAPIService.updateProductStock(id, stock);
  }

  getProductById(userId: string): Observable<ProductDomain> {
    return this.productAPIService.getProductById(userId);
  }
}
