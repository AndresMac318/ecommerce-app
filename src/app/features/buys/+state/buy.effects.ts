import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BuyUsecaseService } from '../application/buy-usecase.service';

import Swal from 'sweetalert2';
import * as BuysActions from './buy.actions';
import * as UsersActions from '../../auth/+state/user.actions';
import { catchError, EMPTY, exhaustMap, map, of, tap } from 'rxjs';

@Injectable()
export class BuyEffect {
  private actions$ = inject(Actions);
  private buySvc = inject(BuyUsecaseService);

  getBuysByClientId$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BuysActions.getBuysByClient),
      exhaustMap(({ clientId }) =>
        this.buySvc.getBuysByClient(clientId).pipe(
          map((buys) => BuysActions.getBuysByClientSuccess({ buys })),
          catchError((error) =>
            of(BuysActions.getBuysByClientFailure({ error }))
          )
        )
      )
    );
  });

  registerBuy$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BuysActions.registerBuy),
      exhaustMap(({ buyData }) =>
        this.buySvc.registerBuy(buyData).pipe(
          map((buy) => {
            return BuysActions.registerBuySuccess({ buyItem: buy });
          }),
          catchError((error) => {
            console.error(error);
            return of(BuysActions.registerBuyFailure({ error: error.error.message }));
          })
        )
      )
    );
  });

  registerBuySuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BuysActions.registerBuySuccess),
      tap(() => {
        Swal.fire('Success', 'Buy Successfull', 'success');
      })
    );
  }, { dispatch: false });

  registerBuyFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(BuysActions.registerBuyFailure),
        tap(({ error }) => {
          Swal.fire(
            'Error',
            `The buy process failure!, Error: ${error}`,
            'error'
          );
        })
      );
    },
    { dispatch: false }
  );

  registerBuyCart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BuysActions.registerBuyCart),
      exhaustMap(({ buyData }) =>
        this.buySvc.registerBuy(buyData).pipe(
          map((buy) => {
            return BuysActions.registerBuyCartSuccess({ buyItem: buy });
          }),
          catchError((error) => {
            console.error(error);
            return of(BuysActions.registerBuyCartFailure({ error: error.error.message }));
          })
        )
      )
    );
  });

  registerBuyCartSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BuysActions.registerBuyCartSuccess),
      exhaustMap((buy) => {
        Swal.fire('Success', 'Buy Successfull', 'success');
        return of(UsersActions.clearCart({}));
      })
    );
  });

  registerBuyCartFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(BuysActions.registerBuyCartFailure),
        tap(({ error }) => {
          Swal.fire(
            'Error',
            `The buy process failure!, Error: ${error}`,
            'error'
          );
        })
      );
    },
    { dispatch: false }
  );

}
