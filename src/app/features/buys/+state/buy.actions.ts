import { createAction, props } from '@ngrx/store';
import { BuyDomain } from '../domain/BuyDomain.model';

export const getBuysByClient = createAction(
  '[Buy] Get Buys',
  props<{ clientId: string }>()
);

export const getBuysByClientSuccess = createAction(
  '[Buy] Get Buys Success',
  props<{ buys: BuyDomain[] }>()
);

export const getBuysByClientFailure = createAction(
  '[Buy] Get Buys Failure',
  props<{ error: string }>()
);

export const registerBuy = createAction(
  '[Buy] Register Buy',
  props<{ buyData: BuyDomain }>()
);

export const registerBuySuccess = createAction(
  '[Buy] Register Buy Success',
  props<{ buyItem: BuyDomain }>()
);

export const registerBuyFailure = createAction(
  '[Buy] Register Buy Failure',
  props<{ error: string }>()
);
