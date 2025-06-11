import { createReducer, on } from '@ngrx/store';
import { BuyState } from './buy.state';
import * as BuysActions from './buy.actions';

export const initialState: BuyState = {
  buys: [],
  loading: false,
  error: null,
};

export const buyReducer = createReducer(
  initialState,
  on(
    BuysActions.getBuysByClient,
    (state): BuyState => ({
      ...state,
      loading: true,
    })
  ),
  on(
    BuysActions.getBuysByClientSuccess,
    (state, { buys }): BuyState => ({
      ...state,
      buys,
      loading: false,
    })
  ),
  on(
    BuysActions.getBuysByClientFailure,
    (state, { error }): BuyState => ({
      ...state,
      buys: [],
      error,
      loading: false,
    })
  )
);
