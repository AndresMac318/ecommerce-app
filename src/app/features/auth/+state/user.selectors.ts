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
