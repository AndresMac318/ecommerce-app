import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterLink,
    TranslatePipe
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
