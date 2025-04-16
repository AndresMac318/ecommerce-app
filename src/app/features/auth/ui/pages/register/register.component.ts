import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslatePipe } from '@ngx-translate/core';

import { signup } from '../../../+state/user.actions';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    TranslatePipe,
  ],
  template: `
    <mat-card class="register">
      <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
        <h2>{{ 'AUTH.REGISTER.title' | translate }}</h2>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>{{
            'AUTH.REGISTER.FORM.labels.name' | translate
          }}</mat-label>
          <input matInput type="text" formControlName="name" required />
          @if (controlHasError('name', 'required')) {
            <mat-error> * {{ 'AUTH.errors.name' | translate }} </mat-error>
          }
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>{{
            'AUTH.REGISTER.FORM.labels.email' | translate
          }}</mat-label>
          <input matInput type="email" formControlName="email" required />
          @if (controlHasError('email', 'required')) {
            <mat-error> * {{ 'AUTH.errors.email' | translate }} </mat-error>
          }
          @if (controlHasError('email', 'email')) {
            <mat-error>
              * {{ 'AUTH.errors.email_invalid' | translate }}
            </mat-error>
          }
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Número de celular</mat-label>
          <input matInput type="text" formControlName="phoneNumber" required />
          @if (controlHasError('name', 'required')) {
            <mat-error> * error con el numero </mat-error>
          }
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Date of Birth</mat-label>
          <input
            matInput
            [matDatepicker]="picker"
            formControlName="dateOfBirth"
            required
          />
          <mat-datepicker-toggle
            matSuffix
            [for]="picker"
          ></mat-datepicker-toggle>
          <mat-datepicker #picker></mat-datepicker>
          @if (controlHasError('dateOfBirth', 'required')) {
            <mat-error> * Date of Birth is required. </mat-error>
          }
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Address</mat-label>
          <input matInput type="text" formControlName="address" required />
          @if (controlHasError('address', 'required')) {
            <mat-error> * Direccion requerida </mat-error>
          }
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>{{
            'AUTH.REGISTER.FORM.labels.password' | translate
          }}</mat-label>
          <input matInput type="password" formControlName="password" required />
          @if (controlHasError('password', 'required')) {
            <mat-error> * {{ 'AUTH.errors.password' | translate }} </mat-error>
          }
        </mat-form-field>

        <button
          mat-raised-button
          color="primary"
          type="submit"
          [disabled]="registerForm.invalid"
        >
          {{ 'AUTH.REGISTER.FORM.text_btn' | translate }}
        </button>

        <a routerLink="/auth/login" class="register-link">{{
          'AUTH.REGISTER.FORM.text_have_account' | translate
        }}</a>
      </form>
    </mat-card>
  `,
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  private formBuilder = inject(FormBuilder);
  private store = inject(Store);

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]], //todo: edad minima validar
      address: ['', [Validators.required, Validators.minLength(10)]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const userData = { ...this.registerForm.value };
      console.log(userData);
      this.store.dispatch(signup({ userData }));
    } else {
      console.log('Form invalid');
    }
  }

  controlHasError(control: string, error: string) {
    return this.registerForm.controls[control].hasError(error);
  }
}
