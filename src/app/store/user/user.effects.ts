import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";


import * as AuthActions from "./user.actions";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { AuthState } from "../app.state";
import { Store } from "@ngrx/store";


import { catchError, map, mergeMap, of, tap } from "rxjs";

import Swal from 'sweetalert2'
import { AuthService } from "../../features/auth/services/auth.service";
import { UserService } from "../../core/services/user.service";

@Injectable()
export class AuthEffects {

    constructor(
        private actions$: Actions, // recibe el stream observable de actions
        private authSvc: AuthService,
        private router: Router,
        private location: Location,
        private userSvc: UserService,
        private store: Store<AuthState>
    ){}

    // general purpose hear stream actions, call authSvc => depending on the result dispatch action (success or failure)
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
    )
    // any action returned from effect stream will be dispatched back to the store.

    loginSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.loginSuccess),
            tap(({ user }) => {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userId', user.id);
                localStorage.setItem('user', JSON.stringify(user));
                Swal.fire('Success', 'Login Successful!', 'success');
                this.router.navigate(['category/all-products']).then(() => {
                    this.location.replaceState('category/all-products');
                });
            })
        ),
        { dispatch: false }
    );
}

// todo: usar este efecto en el login crear login