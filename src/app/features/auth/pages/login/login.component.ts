import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslatePipe } from '@ngx-translate/core';
import { UserState } from '../../../../store/app.state';
import { login } from '../../../../store/user/user.actions';
import { Observable } from 'rxjs';
import { selectAuthError, selectAuthLoading } from '../../../../store/user/user.selectors';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterLink,
    TranslatePipe,
  ],
  template: `
    <mat-card class="login-card">
      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
        <h2>{{ "AUTH.LOGIN.title" | translate }}</h2>
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>{{ "AUTH.LOGIN.FORM.labels.email" | translate }}</mat-label>
          <input matInput type="email" formControlName="email" required>
          @if(controlHasError('email', 'required')){
            <mat-error>
              * {{ "AUTH.errors.email" | translate }}
            </mat-error>
          }
          @if(controlHasError('email', 'email')){
            <mat-error>
              * {{ "AUTH.errors.email_invalid" | translate }}
            </mat-error>
          }
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>{{ "AUTH.LOGIN.FORM.labels.password" | translate }}</mat-label>
          <input matInput type="password" formControlName="password" required>
          @if (controlHasError('password', 'required')) {
            <mat-error>
              * {{ "AUTH.errors.password" | translate }}
            </mat-error>
          }
        </mat-form-field>

        <button mat-raised-button color="primary" type="submit" [disabled]="loginForm.invalid">
          {{ "AUTH.LOGIN.FORM.text_btn" | translate }}
        </button>

        <a routerLink="/auth/register" class="register-link">{{ "AUTH.LOGIN.FORM.text_not_account" | translate }}</a>
      </form>
    </mat-card>
  `,
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  
  public loginForm!: FormGroup;

  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(
    private store: Store<UserState>,
    private router: Router,
    private formBuilder: FormBuilder
  ){
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    this.loading$ = this.store.select(selectAuthLoading);
    this.error$ = this.store.select(selectAuthError);
  }
  
  ngOnInit(): void {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
      this.router.navigate(['landing']);
    }
    this.error$.subscribe(error => {
      if (error) {
        Swal.fire('Error', error, 'error');
      }
    });
  }

  controlHasError(control: string, error: string) {
    return this.loginForm.controls[control].hasError(error);
  }

  get username() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit(){
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.store.dispatch(login({email: email, password: password}));
      //console.log('dispatch login');
    }
  }

}
