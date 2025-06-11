import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from './product.state';

export const selectProductState =
  createFeatureSelector<ProductState>('product');

export const selectProductsLoading = createSelector(
  selectProductState,
  (state: ProductState) => state.loading
);

export const selectProductsError = createSelector(
  selectProductState,
  (state: ProductState) => state.error
);

/* product by id */
export const selectProductById = createSelector(
  selectProductState,
  (state: ProductState) => state.currentProduct
);

/* select filters */
export const selectProductFilters = createSelector(
  selectProductState,
  (state: ProductState) => state.filters
);

/* select pagination */
export const selectProductPagination = createSelector(
  selectProductState,
  (state: ProductState) => state.pagination
);

// Selector de caché por key
export const selectCachedProducts = (cacheKey: string) =>
  createSelector(selectProductState, (state) => state.cache[cacheKey] || {});

// Selector para datos actuales
export const selectCurrentProducts = createSelector(
  selectProductState,
  (state) => state.currentPageData
);
