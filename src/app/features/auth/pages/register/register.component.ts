import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  template: `
    <mat-card class="register-card">
      <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
        <h2>Register</h2>
        
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Name</mat-label>
          <input matInput type="text" formControlName="name" required>
          @if(controlHasError('name', 'required')){
            <mat-error>
              * Name is mandatory
            </mat-error>
          }
          @if(controlHasError('email', 'email')){
            <mat-error>
              * Email invalid
            </mat-error>
          }
        </mat-form-field>

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

        <button mat-raised-button color="primary" type="submit" [disabled]="registerForm.invalid">
          Ingresar
        </button>

        <a routerLink="/auth/login" class="register-link">¿Ya tienes cuenta? Inicia sesión</a>
      </form>
    </mat-card>
  `,
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit {
  
  registerForm!: FormGroup;
  private formBuilder = inject(FormBuilder);
  
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });  
  }

  onSubmit(){
    console.log(this.registerForm.value);
    
  }
  
  controlHasError(control: string, error: string) {
    return this.registerForm.controls[control].hasError(error);
  }
}
