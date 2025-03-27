import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Location } from "@angular/common";

import { catchError, map, mergeMap, of, switchMap, tap } from "rxjs";

import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as AuthActions from "./user.actions";

import Swal from 'sweetalert2'

import { AuthService } from "../../features/auth/services/auth.service";
import { UserService } from "../../features/profile/services/user.service";

@Injectable()
export class AuthEffects {

    private actions$ = inject(Actions);
    private authSvc = inject(AuthService); 
    private userSvc = inject(UserService);
    private router = inject(Router);
    private location =inject(Location);

    constructor(){}

    login$ = createEffect(() => 
        this.actions$.pipe(
            ofType(AuthActions.login), // filtra el stream de actions para actuar solo sobre la elegida(s) ej. AuthActions.Login
            mergeMap(({email, password}) => // manage the query asyncronist on authSvc & extract parameters from loginAction
                // Toma la action de login y la mapea a un nuevo observable => authSvc.login
                this.authSvc.login(email, password).pipe( // service inject on effect to interact with external APIs
                    map((user) => AuthActions.loginSuccess({ user })), // con map se transforma el observable de salida
                    // se dispara la accion success si todo transcurre conrrectamente
                    catchError((error) => of(AuthActions.loginFailure({ error: error.message })))
                    // caso contrario se dispara la action failure
                )
            )
        )
    );
    // any action returned from effect stream will be dispatched back to the store.
    
    loginSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.loginSuccess),
            tap(({ user }) => {
                const { password, ...newUser } = user;

                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userId', user.id);
                localStorage.setItem('user', JSON.stringify(newUser));
                Swal.fire('Success', 'Login Successfull', 'success');
                this.router.navigate(['/']).then(() => {
                    this.location.replaceState('/');
                });
            })
        ),
        { dispatch: false }
    );
    
    loginFailure$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.loginFailure),
            tap(({ error }) => {
                console.error('Login failed:', error);
                Swal.fire('Error', 'Invalid Email or Password! Try Again.', 'error');
            })
        ),
        { dispatch: false }
    );
    
    logout$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.logout),
            tap(() => {
                localStorage.removeItem('TOKEN_KEY');
                localStorage.removeItem('user');
                localStorage.removeItem('userId');
                localStorage.setItem('isLoggedIn', 'false');
                this.router.navigate(['/login']);
            }),
            map(() => AuthActions.logoutSuccess())
        )
    );

    signup$ = createEffect(() => 
        this.actions$.pipe(
            ofType(AuthActions.signup),
            switchMap(({ userData }) => 
                this.userSvc.signup(userData).pipe(
                    map((user) => AuthActions.signupSuccess({ user })),
                    catchError((error) => {
                        console.error('Signup Error!', error);
                        return of(AuthActions.signupFailure({ error: error }))
                    })
                )
            )
        )
    );

    signupSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.signupSuccess),
            tap(() => {
                Swal.fire('Success', 'User Created successfully!', 'success');
                this.router.navigate(['auth/login']);
            })
        ),
        { dispatch: false }
    );

    signupFailure$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.signupFailure),
            tap(({ error }) => {
                console.error('Signup failed:', error);
                Swal.fire('Error', error, 'error');
            })
        ),
        { dispatch: false }
    );

    updateProfile$ = createEffect(() =>
        this.actions$.pipe(
          ofType(AuthActions.updateProfile),
          mergeMap(({ userId, userData }) =>
            this.userSvc.updateProfile(userId, userData).pipe(
              map(user => AuthActions.updateProfileSuccess({ user })),
              catchError(error => of(AuthActions.updateProfileFailure({ error })))
            )
          )
        )
      );
    
    updateProfileSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.updateProfileSuccess),
            tap(() => {
                Swal.fire('Success', 'Profile Updated successfully!', 'success');
            })
        ),
        { dispatch: false }
    );

    editProfileFailure$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.updateProfileFailure),
            tap(({ error }) => {
                if (error === 'Email already exists') {
                    Swal.fire('Error', 'Email already exists', 'error');
                } else {
                    Swal.fire('Error', 'Error updating profile', 'error');
                }
            })
        ),
        { dispatch: false }
    );
        
}
