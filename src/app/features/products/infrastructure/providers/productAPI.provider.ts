import { InjectionToken, Provider } from '@angular/core';
import { IProductAPIService } from '../productsAPI.interface';
import { ProductsAPIService } from '../productsAPI.service';

export const HTTP_PRODUCT_SERVICE = new InjectionToken<IProductAPIService>(
  'ProductsAPIService'
);

// At token HTTP_PRODUCT_SERVICE inject implementation from ProductsAPIService
export const PRODUCT_API_PROVIDER: Provider = {
  provide: HTTP_PRODUCT_SERVICE,
  useClass: ProductsAPIService,
};
