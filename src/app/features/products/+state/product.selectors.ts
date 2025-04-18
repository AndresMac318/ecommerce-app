import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from './product.state';

export const selectProductState =
  createFeatureSelector<ProductState>('product');

/*
antiguo
// products
export const selectAllProducts = createSelector(
  selectProductState,
  (state: ProductState) => state.products
); */

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

/* sale products */
/* export const selectSaleProduct = createSelector(selectProductState, (state) =>
  state.products?.filter((product) => product.sale)
); */

/* select filtered products  */
/* export const selectFilteredProducts = createSelector(
  selectAllProducts,
  selectProductFilters,
  (products, filters) => {
    return products?.filter((product) => {
      const matchesCategory =
        !filters.category || product.category === filters.category;
      const matchesPrice =
        !filters.priceRange ||
        (product.price >= filters.priceRange[0] &&
          product.price <= filters.priceRange[1]);
      return matchesCategory && matchesPrice;
    });
  }
); */

/* select pagination view */
/* export const selectPaginatedProducts = createSelector(
  selectFilteredProducts,
  selectProductPagination,
  (products, pagination) => {
    const start = (pagination.currentPage - 1) * pagination.pageSize;
    const end = start + pagination.pageSize;
    return products?.slice(start, end);
  }
); */


// Selector de caché por key
export const selectCachedProducts = (cacheKey: string) => createSelector(
  selectProductState,
  (state) => state.cache[cacheKey] || {}
);

// Selector para datos actuales
export const selectCurrentProducts = createSelector(
  selectProductState,
  (state) => state.currentPageData
);

//export const selectCacheKey =