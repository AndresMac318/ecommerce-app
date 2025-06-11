import { createReducer, on } from '@ngrx/store';
import * as ProductActions from './product.actions';
import { ProductState } from './product.state';

export const initialState: ProductState = {
  cache: {},
  currentPageData: [],
  loading: false,
  error: null,
  currentProduct: null,
  filters: {
    category: null,
    priceRange: [10000, 5000000],
  },
  pagination: {
    currentPage: 1,
    pageSize: 10,
    totalItems: 0,
  },
};

export const productReducer = createReducer(
  initialState,
  on(
    ProductActions.getProducts,
    (state): ProductState => ({
      ...state,
      loading: true,
    })
  ),
  // new
  on(
    ProductActions.loadCachedProducts,
    (state, { cacheKey }): ProductState => ({
      ...state,
      loading: false,
      currentPageData: state.cache[cacheKey].data,
    })
  ),
  on(
    ProductActions.getProductsSuccess,
    (state, { products, totalItems, cacheKey }): ProductState => ({
      ...state,
      cache: {
        ...state.cache,
        [cacheKey]: {
          data: products,
          timestamp: Date.now(),
        },
      },
      currentPageData: products,
      loading: false,
      error: null,
      pagination: { ...state.pagination, totalItems: totalItems },
    })
  ),
  on(
    ProductActions.getProductsFailure,
    (state, { error }): ProductState => ({
      ...state,
      currentPageData: [],
      loading: false,
      error,
    })
  ),
  on(
    ProductActions.getProductById,
    (state): ProductState => ({
      ...state,
      loading: true,
      error: null,
    })
  ),
  on(
    ProductActions.getProductByIdSuccess,
    (state, { product }): ProductState => ({
      ...state,
      loading: false,
      error: null,
      currentProduct: product,
    })
  ),
  on(
    ProductActions.getProductByIdFailure,
    (state, { error }): ProductState => ({
      ...state,
      loading: false,
      error,
      currentPageData: [],
    })
  ),
  // ? background update
  on(
    ProductActions.backgroundUpdateSuccess,
    (state, { cacheKey, products }): ProductState => ({
      ...state,
      cache: {
        ...state.cache,
        [cacheKey]: {
          data: products,
          timestamp: Date.now(),
        },
      },
      currentPageData:
        state.currentPageData === state.cache[cacheKey].data
          ? products
          : state.currentPageData,
    })
  ),
  on(
    ProductActions.applyFilters,
    (state, { filters }): ProductState => ({
      ...state,
      cache: {}, // cache invalidation
      filters: { ...filters },
      pagination: {
        ...state.pagination,
        //currentPage: 1,
      },
    })
  ),
  on(
    ProductActions.changePage,
    (state, { page }): ProductState => ({
      ...state,
      pagination: {
        ...state.pagination,
        currentPage: page,
      },
    })
  )
);
