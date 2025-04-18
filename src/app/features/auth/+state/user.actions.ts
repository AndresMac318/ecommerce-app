import { createAction, props } from '@ngrx/store';
import { UserDomain } from '../domain/userDomain.model';

// Login

export const login = createAction(
  '[Auth] Login',
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: UserDomain }>()
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
  props<{ userData: UserDomain }>()
);

export const signupSuccess = createAction(
  '[Auth] Signup Success',
  props<{ user: UserDomain }>()
);

export const signupFailure = createAction(
  '[Auth] Signup Failure',
  props<{ error: string }>()
);

// User

export const updateProfile = createAction(
  '[User] Update Profile',
  props<{ userId: string; userData: UserDomain }>()
);

export const updateProfileSuccess = createAction(
  '[User] Update Profile Success',
  props<{ user: UserDomain }>()
);

export const updateProfileFailure = createAction(
  '[User] Update Profile Failure',
  props<{ error: string }>()
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
