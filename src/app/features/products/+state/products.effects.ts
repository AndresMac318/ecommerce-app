import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductUseCaseService } from '../application/product-usecase.service';

import * as ProductsActions from './product.actions';
import {
  catchError,
  exhaustMap,
  map,
  mergeMap,
  of,
  switchMap,
  take,
  tap,
  withLatestFrom,
} from 'rxjs';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import {
  selectCachedProducts,
  selectProductFilters,
  selectProductPagination,
} from './product.selectors';
import { generateCacheKey } from '../../../common/utils/generateCacheKey';

@Injectable()
export class ProductEffects {
  private actions$ = inject(Actions);
  private store = inject(Store);
  private productsSvc = inject(ProductUseCaseService);

  /* 
  In the effect, the logic of verification cache are management. If the data is in cache an action will be dispatch, if exists in localstorage the data will be charged from here, else the http query is made
  */
  getProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        ProductsActions.getProducts,
        ProductsActions.changePage,
        ProductsActions.applyFilters
      ),
      withLatestFrom(
        this.store.select(selectProductPagination),
        this.store.select(selectProductFilters)
      ),
      switchMap(([, pagination, filters]) => {
        const cacheKey = generateCacheKey(pagination, filters); //return cacheKey
        const cachedData = this.store.select(selectCachedProducts(cacheKey));

        return cachedData.pipe(
          take(1),
          mergeMap((cache) => {
            // # case 1: data in cache & vigent
            const CACHE_TTL = 2 * 60 * 1000;
            if (cache && Date.now() - cache.timestamp < CACHE_TTL) {
              //console.log('CACHE if');
              return [
                ProductsActions.loadCachedProducts({ cacheKey }),
                // ? ProductsActions.backgroundUpdateRequest({ cacheKey }) //opcional
              ];
            }

            // # case 2: make query
            return this.productsSvc
              .getProductsPaginated(
                pagination.currentPage,
                pagination.pageSize,
                filters
              )
              .pipe(
                tap(() => {
                  localStorage.setItem(
                    'appKit_ecommerce/filtersData',
                    JSON.stringify(filters)
                  );
                }),
                map(({ products, totalItems, cacheKey }) => {
                  return ProductsActions.getProductsSuccess({
                    products,
                    totalItems,
                    cacheKey,
                  });
                })
              );
          })
        );
      })
    );
  });

  // ? background updates effect
  /* getProductsBackgroundUpdate$ = createEffect(() => 
    this.actions$.pipe(
      ofType(ProductsActions.backgroundUpdateRequest),
      switchMap(({ cacheKey }) => {
        const { page, pageSize, filters } = parseCacheKey(cacheKey);
        
        return this.productsSvc.getProductsPaginated(page, pageSize, filters).pipe(
          tap(() => console.log('background updates...')),
          map(({ products }) => ProductsActions.backgroundUpdateSuccess({ cacheKey, products })),
          catchError(error => of(ProductsActions.backgroundUpdateFailure({ cacheKey, error })))
        )
      })
    )
  ); */

  getProductsFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ProductsActions.getProductsFailure),
        tap(({ error }) => {
          console.error('Products Load failure', error);
          Swal.fire('Error', 'Error during products load');
        })
      );
    },
    { dispatch: false }
  );

  getProductById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductsActions.getProductById),
      exhaustMap(({ id }) =>
        this.productsSvc.getProductById(id).pipe(
          map((product) => ProductsActions.getProductByIdSuccess({ product })),
          catchError((error) =>
            of(
              ProductsActions.getProductByIdFailure({
                error: error.message,
              })
            )
          )
        )
      )
    );
  });
}
