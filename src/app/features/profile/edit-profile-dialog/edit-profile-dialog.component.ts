import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';

import { MatDialogModule, MatDialogClose, MatDialogActions, MatDialogRef } from '@angular/material/dialog';
import { UserDialogData, UserDialogResult } from '../../../core/interfaces/user-dialog.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { UserState } from '../../../store/app.state';
import { updateProfile } from '../../../store/user/user.actions';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-edit-profile-dialog',
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    MatDialogModule, 
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatIconModule
  ],
  providers: [ provideNativeDateAdapter() ],
  template: `
    <div class="container">
      
      <mat-dialog-content>
        <h2 mat-dialog-title class="form__title" >{{ data.title }}</h2>
        
        <form [formGroup]="userForm" *ngIf="!loading" class="form">
          <mat-form-field appearance="outline" class="form__matfield">
            <mat-label>Nombre</mat-label>
            <input matInput formControlName="name" placeholder="Nombre">
            <mat-error *ngIf="userForm.get('name')?.hasError('required')">
              El nombre es obligatorio
            </mat-error>
          </mat-form-field>
          
          <mat-form-field appearance="outline" class="form__matfield">
            <mat-label>Email</mat-label>
            <input matInput formControlName="email" placeholder="Email" type="email">
            <mat-error *ngIf="userForm.get('email')?.hasError('required')">
              El email es obligatorio
            </mat-error>
            <mat-error *ngIf="userForm.get('email')?.hasError('email')">
              Formato de email inválido
            </mat-error>
          </mat-form-field>
          
          <mat-form-field appearance="outline" class="form__matfield">
            <mat-label>Teléfono</mat-label>
            <input matInput formControlName="phoneNumber" placeholder="Número de teléfono">
          </mat-form-field>

          <mat-form-field appearance="outline" class="form__matfield">
            <mat-label>Fecha de nacimiento</mat-label>
            <input matInput [matDatepicker]="datepicker" formControlName="dateOfBirth">
            <mat-datepicker #datepicker/>
            <mat-datepicker-toggle [for]="datepicker" matSuffix/>
          </mat-form-field>

          <mat-form-field appearance="outline" class="form__matfield">
            <mat-label>Dirección</mat-label>
            <textarea matInput formControlName="address" placeholder="Dirección"></textarea>
          </mat-form-field>

          <!-- <mat-form-field appearance="outline" class="form__matfield">
            <mat-label>Password</mat-label>
            <input 
            matInput 
            [type]="hidePassword() ? 'password' : 'text' " 
            formControlName="password" 
            required
            >
            <button 
            mat-icon-button
            matSuffix
            (click)="clickEvent($event)"
            [attr.aria-label]="'Hide password'"
            [attr.aria-pressed]="hidePassword()"
            >
              <mat-icon>{{ hidePassword() ? 'visibility_off' : 'visibility' }}</mat-icon>
            </button>
            @if (controlHasError('password', 'required')) {
              <mat-error>
                * Password is mandatory
              </mat-error>
            }
          </mat-form-field> -->
         
        </form>
      </mat-dialog-content>
      
      <mat-dialog-actions class="form__actions">
        <button (click)="updateProfile()" mat-button >Save</button>
        <button (click)="closeDialog()" mat-button >Close</button>
      </mat-dialog-actions>
    </div>
  `,
  styleUrl: './edit-profile-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditProfileDialogComponent implements OnInit {


  public dialogRef = inject(DialogRef<UserDialogResult>);
  public data: UserDialogData = inject(DIALOG_DATA);
  public hidePassword = signal(true);

  public userForm!: FormGroup;
  private fb = inject(FormBuilder);
  public userId: string|null = null;
  public loading = false;

  constructor(private store: Store<UserState>, private userSvc: UserService){
    this.userId = String(localStorage.getItem('userId'));
    this.createForm();
  }

  ngOnInit(): void {
    this.chargeForm();
  }

  closeDialog(){
    this.dialogRef.close();
  }

  createForm(): void {
    this.userForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      dateOfBirth: ['', [Validators.required]],
      address: ['', [Validators.required]],
      //password: ['', [Validators.required]],
    })
  }

  chargeForm(): void {
    if (this.userId) {
      this.userSvc.getCurrentUser().subscribe(
        (user) => {
          console.log('fetched data', user);
          this.userForm.patchValue(user);
        },
        (error) => {
          console.error('Error fetching data', error);
        }
      )
    }
  }

  controlHasError(control: string, error: string){
    return this.userForm.controls[control].hasError(error);
  }

  clickEvent(event: MouseEvent) {
    this.hidePassword.set(!this.hidePassword());
    event.stopPropagation();
  }

  updateProfile(){
    console.log('update profile');
    if (this.userForm.valid && this.userId) {
      this.store.dispatch(updateProfile({userId: this.userId, userData: this.userForm.value}))
      
    }
    //this.dialogRef.close();
  }

}
