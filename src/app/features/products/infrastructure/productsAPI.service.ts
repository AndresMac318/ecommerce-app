import { inject, Injectable } from '@angular/core';
import { IProductAPIService } from './productsAPI.interface';
import { catchError, map, Observable, throwError } from 'rxjs';
import { ProductDomain } from '../domain/productDomain.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { ProductAPIResponse, ProductPaginatedAPIResponse } from './models/productAPI.model';
import { ProductFilters } from '../+state/product.state';

@Injectable({
  providedIn: 'root',
})
export class ProductsAPIService implements IProductAPIService {
  private http = inject(HttpClient);
  private readonly api_url = environment.API_URL_BASE;

  getAllProducts(): Observable<ProductDomain[]> {
    return this.http
      .get<ProductAPIResponse[]>(`${this.api_url}/products`)
      .pipe(
        catchError((error) =>
          throwError(() =>
            console.log('An error has been in get products', error)
          )
        )
      );
  }

  getProductsPaginated(
    page: number,
    pageSize: number,
    filters?: ProductFilters
  ): Observable<{products: ProductDomain[], totalItems: number, cacheKey: string}> {

    let params = new HttpParams()
      .set('_page', page.toString())
      .set('_per_page', pageSize.toString());

    if (filters?.category) {
      params = params.set('category', filters.category);
    }
    if (filters?.priceRange) {
      params = params
        .set('price_gte', filters.priceRange[0].toString())
        .set('price_lte', filters.priceRange[1].toString());
    }

    const cacheKey = `${page}|${pageSize}|${filters?.category}|${filters?.priceRange?.[0]}|${filters?.priceRange?.[1]}|`;

    return this.http
      .get<ProductPaginatedAPIResponse>(`${this.api_url}/products`, {
        params,
        //observe: 'response',
      })
      .pipe(
        map((res) => ({
          products: res.data,
          totalItems: res.items,
          cacheKey: cacheKey
        })),
        catchError(err => {
          console.error('API error: ', err);
          return throwError(() => new Error('Failed to load products'));
        })
      );
  }

  getProductById(userId: string): Observable<ProductDomain> {
    return this.http
      .get<ProductAPIResponse>(`${this.api_url}/products/${userId}`)
      .pipe(
        catchError((error) =>
          throwError(() =>
            console.log('An error has been in get product', error)
          )
        )
      );
  }
}
