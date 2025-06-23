import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
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
import { MatIconModule } from '@angular/material/icon';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
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
          <mat-label>{{
            'AUTH.REGISTER.FORM.labels.cellphone_number' | translate
          }}</mat-label>
          <input matInput type="text" formControlName="phoneNumber" required />
          @if (controlHasError('name', 'required')) {
            <mat-error> * {{ 'AUTH.errors.cellphone_invalid' | translate }}</mat-error>
          }
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>{{
            'AUTH.REGISTER.FORM.labels.date_of_birth' | translate
          }}</mat-label>
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
            <mat-error> * {{ 'AUTH.errors.dateofbirth_invalid' | translate }} </mat-error>
          }
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>{{
            'AUTH.REGISTER.FORM.labels.address' | translate
          }}</mat-label>
          <input matInput type="text" formControlName="address" required />
          @if (controlHasError('address', 'required')) {
            <mat-error> * {{ 'AUTH.errors.address_invalid' | translate }} </mat-error>
          }
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>{{
            'AUTH.REGISTER.FORM.labels.password' | translate
          }}</mat-label>
          <input matInput type="password" formControlName="password" required />
          <button
            mat-icon-button
            matSuffix
            type="button"
            [attr.aria-label]="'Hide password'"
            (click)="clickEvent($event)"
          >
            <mat-icon>{{showPassword() ? 'visibility_off' : 'visibility'}}</mat-icon>
          </button>
          @if (controlHasError('password', 'required')) {
            <mat-error> * {{ 'AUTH.errors.password' | translate }} </mat-error>
          }
        </mat-form-field>

        <button
          mat-flat-button
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
  showPassword = signal(true);

  private formBuilder = inject(FormBuilder);
  private store = inject(Store);

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      address: ['', [Validators.required, Validators.minLength(10)]],
      password: ['', [Validators.required]],
    });
  }

  clickEvent(event: MouseEvent) {
    this.showPassword.update((value) => !value); 
    event.stopPropagation();
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const userData = { ...this.registerForm.value };
      return this.store.dispatch(signup({ userData }));
    } else {
      return Swal.fire('Alert', 'Form invalid!', 'info');
    }
  }

  controlHasError(control: string, error: string) {
    return this.registerForm.controls[control].hasError(error);
  }
}
