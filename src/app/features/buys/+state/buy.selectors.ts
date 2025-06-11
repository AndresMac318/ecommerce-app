import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BuyState } from './buy.state';

export const selectBuyState = createFeatureSelector<BuyState>('buy');

export const selectBuysByUserId = (idUser?: string) =>
  createSelector(selectBuyState, (state: BuyState) => {
    const filteredBuys = idUser
      ? state.buys.filter((buy) => buy.idUser === idUser)
      : state.buys;
    // sort by more recent date
    return [...filteredBuys].sort((a, b) => {
      return new Date(b.dateSale).getTime() - new Date(a.dateSale).getTime();
    });
  });

export const selectProductsLoading = createSelector(
  selectBuyState,
  (state: BuyState) => state.loading
);

export const selectProductsError = createSelector(
  selectBuyState,
  (state: BuyState) => state.error
);
