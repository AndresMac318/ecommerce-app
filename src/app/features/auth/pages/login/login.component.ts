import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterLink
  ],
  template: `
    <mat-card class="login-card">
      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
        <h2>Iniciar Sesión</h2>
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Email</mat-label>
          <input matInput type="email" formControlName="email" required>
          @if(controlHasError('email', 'required')){
            <mat-error>
              * Email is mandatory
            </mat-error>
          }
          @if(controlHasError('email', 'email')){
            <mat-error>
              * Email invalid
            </mat-error>
          }
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Password</mat-label>
          <input matInput type="password" formControlName="password" required>
          @if (controlHasError('password', 'required')) {
            <mat-error>
              * Password is mandatory
            </mat-error>
          }
        </mat-form-field>

        <button mat-raised-button color="primary" type="submit" [disabled]="loginForm.invalid">
          Ingresar
        </button>

        <a routerLink="/auth/register" class="register-link">¿No tienes cuenta? Regístrate</a>
      </form>
    </mat-card>
  `,
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  
  loginForm!: FormGroup;
  private formBuilder = inject(FormBuilder);
  
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });  
  }

  controlHasError(control: string, error: string) {
    return this.loginForm.controls[control].hasError(error);
  }

  onSubmit(){
    console.log("form value:", this.loginForm.value);
    
  }

}
