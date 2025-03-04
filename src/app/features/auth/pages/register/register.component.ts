import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    TranslatePipe
  ],
  template: `
    <mat-card class="register-card">
      <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
        <h2>{{ "AUTH.REGISTER.title" | translate }}</h2>
        
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>{{ "AUTH.REGISTER.FORM.labels.name" | translate }}</mat-label>
          <input matInput type="text" formControlName="name" required>
          @if(controlHasError('name', 'required')){
            <mat-error>
              * {{ "AUTH.errors.name" | translate }}
            </mat-error>
          }
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>{{ "AUTH.REGISTER.FORM.labels.email" | translate }}</mat-label>
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
          <mat-label>{{ "AUTH.REGISTER.FORM.labels.password" | translate }}</mat-label>
          <input matInput type="password" formControlName="password" required>
          @if (controlHasError('password', 'required')) {
            <mat-error>
              * {{ "AUTH.errors.password" | translate }}
            </mat-error>
          }
        </mat-form-field>

        <button mat-raised-button color="primary" type="submit" [disabled]="registerForm.invalid">
          {{ "AUTH.REGISTER.FORM.text_btn" | translate }}
        </button>

        <a routerLink="/auth/login" class="register-link">{{ "AUTH.REGISTER.FORM.text_have_account" | translate }}</a>
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
