import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductUseCaseService } from '../application/product-usecase.service';

import * as ProductsActions from './product.actions';
import {
  catchError,
  exhaustMap,
  map,
  of,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import {
  selectProductFilters,
  selectProductPagination,
} from './product.selectors';

@Injectable()
export class ProductEffects {
  private actions$ = inject(Actions);
  private store = inject(Store);
  private productsSvc = inject(ProductUseCaseService);

  /* 
  En el effect, se manejaría la lógica de verificación de caché. Si los datos están en caché, se despacha una acción para cargarlos desde el store. Si no, se procede a la solicitud HTTP.
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
      switchMap(([, pagination, filters]) =>
        this.productsSvc
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
            map(({ products, totalCount }) =>
              ProductsActions.getProductsSuccess({ products, totalCount })
            ),
            catchError((error) =>
              of(ProductsActions.getProductsFailure({ error }))
            )
          )
      )
    );
  });

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
