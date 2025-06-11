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
  props<{ products: ProductDomain[]; totalItems: number; cacheKey: string }>()
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

// new action
export const loadCachedProducts = createAction(
  '[Product] Get Cached Products',
  props<{ cacheKey: string }>()
);

// ? background update
export const backgroundUpdateRequest = createAction(
  '[Product] Background Update Request',
  props<{ cacheKey: string }>()
);
export const backgroundUpdateSuccess = createAction(
  '[Product] Background Update Success',
  props<{ cacheKey: string; products: ProductDomain[] }>()
);
export const backgroundUpdateFailure = createAction(
  '[Product] Background Update Failure',
  props<{ cacheKey: string; error: string }>()
);
