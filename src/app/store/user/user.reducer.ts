import { createReducer, on } from "@ngrx/store";
import { AuthState } from "../app.state";
import * as AuthActions from './user.actions';

export const initialState: AuthState = {
    user: null,
    loading: false,
    error: null
};

export const authReducer = createReducer(
    initialState,
    // Login
    on(AuthActions.login, (state) => ({
        ...state,
        loading: true,
        error: null
    })),
    on(AuthActions.loginSuccess, (state, { user }) => ({
        ...state,
        user,
        loading: false,
        error: null
    })),
    on(AuthActions.loginFailure, (state, { error }) => ({
        ...state,
        user: null,
        loading: false,
        error
    })),
    //Logout
    on(AuthActions.logout, (state) => ({
        ...state,
        loading: true,
    })),
    on(AuthActions.logoutSuccess, () => ({
        user: null,
        loading: false,
        error: null,
    })),
    // Signup
    on(AuthActions.signup, (state) => ({
        ...state,
        loading: true,
    })),
    on(AuthActions.signupSuccess, (state, { user }) => ({
        ...state,
        user,
        loading: false,
        error: null,
    })),
    on(AuthActions.signupFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),
    // User
    on(AuthActions.updateProfile, (state) => ({
        ...state,
        loading: true,
        error: null
    })),
    on(AuthActions.updateProfileSuccess, (state, { user }) => ({
        ...state,
        user,
        error: null
    })),
    on(AuthActions.updateProfileFailure, (state, { error }) => ({
        ...state,
        error
    })),
    on(AuthActions.changePassword, (state, { newPassword }) => ({
        ...state,
        loading: true,
        error: null
    })),
    on(AuthActions.changePasswordSuccess, (state, { user }) => ({
        ...state,
        currentUser: user,
        error: null
    })),
    on(AuthActions.changePasswordFailure, (state, { error }) => ({
        ...state,
        error
    }))
)