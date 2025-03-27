import { createAction, props } from '@ngrx/store';
import { User } from '../../core/interfaces/user.model';

// Login

export const login = createAction(
  '[Auth] Login',
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
    '[Auth] Login Success',
    props<{ user: User }>()
);

export const loginFailure = createAction(
    '[Auth] Login Failure',
    props<{ error: string }>()
);

export const logout = createAction('[Auth] Logout');

export const logoutSuccess = createAction('[Auth] Logout Success');

// Sign-up

export const signup = createAction(
    '[Auth] Signup',
    props<{ userData: Omit<User, 'id' | 'role' | 'cart'> }>()
);

export const signupSuccess = createAction(
    '[Auth] Signup Success',
    props<{ user: User }>()
);

export const signupFailure = createAction(
    '[Auth] Signup Failure',
    props<{ error: any }>()
);

// User

export const updateProfile = createAction(
    '[User] Update Profile',
    props<{ userId: string; userData: any }>()
);

export const updateProfileSuccess = createAction(
    '[User] Update Profile Success',
    props<{ user: any }>()
);

export const updateProfileFailure = createAction(
    '[User] Update Profile Failure',
    props<{ error: any }>()
);

/* export const changePassword = createAction(
    '[User] Change Password',
    props<{ userId: string; updateUserData: any }>()
);

export const changePasswordSuccess = createAction(
    '[User] Change Password Success',
    props<{ user: any }>()
);

export const changePasswordFailure = createAction(
    '[User] Change Password Failure',
    props<{ error: any }>()
); */