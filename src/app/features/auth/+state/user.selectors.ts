import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.state';

export const selectAuthState = createFeatureSelector<UserState>('user');

export const selectUser = createSelector(
  selectAuthState,
  (state: UserState) => state.user
);

export const selectAuthLoading = createSelector(
  selectAuthState,
  (state: UserState) => state.loading
);

export const selectAuthError = createSelector(
  selectAuthState,
  (state: UserState) => state.error
);

// cart

export const selectCartItems = createSelector(
  selectAuthState,
  (state) => state.user?.cart || []
);

export const selectCartItemsCount = createSelector(
  selectCartItems,
  (items) => items.length
);

/* export const selectCartItemsCount = createSelector(
  selectCartItems,
  (items) => items.reduce((total, item) => total + item.quantity, 0)
); */

export const selectCartTotal = createSelector(
  selectCartItems,
  (items) => items.reduce((total, item) => total + (item.price * item.quantity), 0)
);

export const selectCartItemById = (productId: string) => 
  createSelector(
    selectCartItems,
    (items) => items.find(i => i.productId === productId)
  );