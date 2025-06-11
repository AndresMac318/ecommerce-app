import { createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';
import { UserState } from './user.state';

export const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

export const userReducer = createReducer(
  initialState,
  // Login
  on(
    UserActions.login,
    (state): UserState => ({
      ...state,
      loading: true,
      error: null,
    })
  ),
  on(
    UserActions.loginSuccess,
    (state, { user }): UserState => ({
      ...state,
      user,
      loading: false,
      error: null,
    })
  ),
  on(
    UserActions.loginFailure,
    (state, { error }): UserState => ({
      ...state,
      user: null,
      loading: false,
      error,
    })
  ),
  on(
    UserActions.loadAuthData,
    (state, { user }): UserState => ({
      ...state,
      user,
      loading: false,
      error: null,
    })
  ),
  //Logout
  on(
    UserActions.logout,
    (state): UserState => ({
      ...state,
      loading: true,
    })
  ),
  on(
    UserActions.logoutSuccess,
    (): UserState => ({
      user: null,
      loading: false,
      error: null,
    })
  ),
  // Signup
  on(
    UserActions.signup,
    (state): UserState => ({
      ...state,
      loading: true,
    })
  ),
  on(
    UserActions.signupSuccess,
    (state, { user }): UserState => ({
      ...state,
      user,
      loading: false,
      error: null,
    })
  ),
  on(
    UserActions.signupFailure,
    (state, { error }): UserState => ({
      ...state,
      loading: false,
      error,
    })
  ),
  // User
  on(
    UserActions.updateProfile,
    (state): UserState => ({
      ...state,
      loading: true,
      error: null,
    })
  ),
  on(
    UserActions.updateProfileSuccess,
    (state, { user }): UserState => ({
      ...state,
      user,
      error: null,
    })
  ),
  on(
    UserActions.updateProfileFailure,
    (state, { error }): UserState => ({
      ...state,
      error,
    })
  ),
  // *************************   cart   **************************
  // add item
  on(UserActions.addItemToCart, (state, { item }): UserState => {
    if (!state.user) return state;

    const existingItem = state.user.cart?.find((i) => i.id === item.id);

    const newCart = existingItem
      ? state.user.cart?.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        )
      : [...(state.user.cart || []), item];

    return {
      ...state,
      user: {
        ...state.user,
        cart: newCart,
      },
    };
  }),
  // delete item
  on(UserActions.removeFromCart, (state, { productId }) => ({
    ...state,
    user: state.user
      ? {
          ...state.user,
          cart: state.user.cart?.filter((i) => i.id !== productId) || [],
        }
      : null,
  })),
  // update quantity
  on(UserActions.updateItemQuantity, (state, { productId, quantity }) => ({
    ...state,
    user: state.user
      ? {
          ...state.user,
          cart:
            state.user.cart?.map((i) =>
              i.id === productId ? { ...i, quantity } : i
            ) || [],
        }
      : null,
  })),
  // clean cart
  on(
    UserActions.clearCart,
    (state): UserState => ({
      ...state,
      user: state.user
        ? {
            ...state.user,
            cart: [],
          }
        : null,
    })
  ),
  // Sync success
  on(
    UserActions.cartOperationSuccess,
    (state, { cart }): UserState => ({
      ...state,
      user: state.user ? { ...state.user, cart } : null,
    })
  )
);
