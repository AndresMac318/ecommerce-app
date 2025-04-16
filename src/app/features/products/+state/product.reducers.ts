import { createReducer, on } from '@ngrx/store';
import * as ProductActions from './product.actions';
import { ProductState } from './product.state';

export const initialState: ProductState = {
  products: [],
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
  on(
    ProductActions.getProductsSuccess,
    (state, { products, totalCount }): ProductState => ({
      ...state,
      products: [...products],
      loading: false,
      error: null,
      currentProduct: null,
      pagination: {
        ...state.pagination,
        totalItems: totalCount,
      },
    })
  ),
  on(
    ProductActions.getProductsFailure,
    (state, { error }): ProductState => ({
      ...state,
      //products: null,
      loading: false,
      error,
      // currentProduct: null,
      // categories: []
    })
  ),
  on(
    ProductActions.getProductById,
    (state): ProductState => ({
      ...state,
      loading: true,
      error: null,
      currentProduct: null,
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
      products: [],
      loading: false,
      error,
      currentProduct: null,
    })
  ),
  on(
    ProductActions.applyFilters,
    (state, { filters }): ProductState => ({
      ...state,
      filters: { ...filters },
      //products: [...state.products],
      pagination: {
        ...state.pagination,
        currentPage: 1,
      },
    })
  ),
  on(ProductActions.changePage, (state, { page }): ProductState => ({
    ...state,
    pagination: {
      ...state.pagination,
      currentPage: page,
    },
  }))
);
