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
  )
  /* on(AuthActions.changePassword, (state, { newPassword }) => ({
        ...state,
        loading: true,
        error: null
    })), */
  /* on(AuthActions.changePasswordSuccess, (state, { user }) => ({
        ...state,
        currentUser: user,
        error: null
    })),
    on(AuthActions.changePasswordFailure, (state, { error }) => ({
        ...state,
        error
    })) */
);
