import { createReducer, on } from "@ngrx/store";
import { UserState } from "../app.state";
import * as UserActions from './user.actions';

export const initialState: UserState = {
    user: null,
    loading: false,
    error: null
};

export const userReducer = createReducer(
    initialState,
    // Login
    on(UserActions.login, (state) => ({
        ...state,
        loading: true,
        error: null
    })),
    on(UserActions.loginSuccess, (state, { user }) => ({
        ...state,
        user,
        loading: false,
        error: null
    })),
    on(UserActions.loginFailure, (state, { error }) => ({
        ...state,
        user: null,
        loading: false,
        error
    })),
    //Logout
    on(UserActions.logout, (state) => ({
        ...state,
        loading: true,
    })),
    on(UserActions.logoutSuccess, () => ({
        user: null,
        loading: false,
        error: null,
    })),
    // Signup
    on(UserActions.signup, (state) => ({
        ...state,
        loading: true,
    })),
    on(UserActions.signupSuccess, (state, { user }) => ({
        ...state,
        user,
        loading: false,
        error: null,
    })),
    on(UserActions.signupFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),
    // User
  /*   on(AuthActions.updateProfile, (state) => ({
        ...state,
        loading: true,
        error: null
    })), */
    /* on(AuthActions.updateProfileSuccess, (state, { user }) => ({
        ...state,
        currentUser: user,
        error: null
    })),
    on(AuthActions.updateProfileFailure, (state, { error }) => ({
        ...state,
        error
    })), */
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
)