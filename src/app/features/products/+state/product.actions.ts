import { createAction, props } from '@ngrx/store';
import { ProductDomain } from '../domain/productDomain.model';
import { ProductFilters } from './product.state';

/* products */
export const getProducts = createAction(
  '[Product] Get Products',
  props<{ page?: number; filters?: ProductFilters }>()
);

export const getProductsSuccess = createAction(
  '[Product] Get Products Success',
  props<{ products: ProductDomain[]; totalCount: number }>()
);

export const getProductsFailure = createAction(
  '[Product] Get Products Failure',
  props<{ error: string }>()
);

/* product by id */
export const getProductById = createAction(
  '[Product] Get Product By Id',
  props<{ id: string }>()
);

export const getProductByIdSuccess = createAction(
  '[Product] Get Product By Id Success',
  props<{ product: ProductDomain }>()
);

export const getProductByIdFailure = createAction(
  '[Product] Get Product By Id Failure',
  props<{ error: string }>()
);

/* filters */
export const applyFilters = createAction(
  '[Product] Apply Filters',
  props<{ filters: ProductFilters }>()
);

/* pagination */
export const changePage = createAction(
  '[Product] Pagination ChangePage',
  props<{ page: number }>()
);
