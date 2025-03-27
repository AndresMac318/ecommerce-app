import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../../features/auth/services/auth.service';
import { Router } from '@angular/router';
import { SidenavService } from '../../../core/services/sidenav.service';
import { DialogService } from '../../../core/services/dialog.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { EditProfileDialogComponent } from '../../../features/profile/edit-profile-dialog/edit-profile-dialog.component';
import { User } from '../../../core/interfaces/user.model';
import { TranslateService } from '@ngx-translate/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { map, Observable, startWith } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ProductsService } from '../../../features/products/services/products.service';
import { OptionItem } from '../../../core/interfaces/optionItem.interface';

@Component({
  selector: 'app-header',
  imports: [
    ReactiveFormsModule,
    AsyncPipe,
    MatToolbarModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule
  ],
  template: `
    <mat-toolbar>
      <button 
        (click)="toggleSidenav()"
        type="button"
        mat-icon-button 
        class="example-icon" 
        aria-label="Example icon-button with menu icon"
      >
        <mat-icon>menu</mat-icon>
      </button>

      <span>Ecommerce</span>

      <!-- <div class="controlform">
          <form>
              <input
                class="controlform__input"
                placeholder="Search here"
                type="text"
                [formControl]="searchInput"
                
                list="productsresults"
              />
              <datalist id="productsresults">
                <option value="anillo"></option>
                <option value="computador" (click)="toResult()" ></option>
                <option value="mouse" (click)="toResult()" ></option>
                <option value="tablet" (click)="toResult()" ></option>
              </datalist>
          </form>
      </div> -->
      
      <div class="formcontainer">
          <form class="form">
              <input
                class="form__input"
                placeholder="Search here"
                type="text"
                [formControl]="searchInput"
                [matAutocomplete]="auto"
              />
              <mat-autocomplete #auto="matAutocomplete">
                @for (option of filteredOptions | async; track option) {
                  <mat-option [value]="option.name" (click)="toResult(option.id)" >{{option.name}}</mat-option>
                }
              </mat-autocomplete>
          </form>
      </div>
      
      <button mat-icon-button [matMenuTriggerFor]="translateMenu">
        <mat-icon>translate</mat-icon>
      </button>
      <mat-menu #translateMenu="matMenu" xPosition="before">
        <button (click)="changeLanguage('es')" mat-menu-item>
          <span>Español</span>
        </button>
        <button (click)="changeLanguage('en')" mat-menu-item>
          <!-- <mat-icon>person_edit</mat-icon> -->
          <span>English</span>
        </button>
      </mat-menu>
      
      @if (authSvc.isLoggedIn()) {
        <button (click)="goToCart()" mat-icon-button class="example-icon" aria-label="Example icon-button with shopping_cart icon">
          <mat-icon>shopping_cart_checkout</mat-icon>
        </button>
        
        <button mat-icon-button [matMenuTriggerFor]="beforeMenu">
          <mat-icon>account_circle</mat-icon>
        </button>

        <mat-menu #beforeMenu="matMenu" xPosition="before">
          <button (click)="openUpdateDialog('23e7')" mat-menu-item>
            <mat-icon>manage_accounts</mat-icon>
            <span>Profile</span>
          </button>
          <button (click)="logout()" mat-menu-item>
            <mat-icon>logout</mat-icon>
            <!-- <mat-icon>person_edit</mat-icon> -->
            <span>Logout</span>
          </button>
        </mat-menu>
      }

    </mat-toolbar>
  `,
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {

  private isLoggedIn = signal(false);
  public products = signal([]);

  public searchInput = new FormControl('');
  public options: OptionItem[] = [];
  public filteredOptions!: Observable<OptionItem[]>;

  constructor(
    public authSvc: AuthService,
    private productsSvc: ProductsService,
    private sidenavSvc: SidenavService,
    private router: Router,
    private translateSvc: TranslateService,
    private dialogSvc: DialogService,
  ){}

  ngOnInit(): void {
    const logged = localStorage.getItem('isLoggedIn');
    if (logged === 'true') {
      this.isLoggedIn.set(true);
    }

    this.productsSvc.getProducts().subscribe(res => {
        this.options = res;
        // console.log(this.options);
    })

    this.filteredOptions = this.searchInput.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): OptionItem[] {
    
    const filterValue = value.toLowerCase();
    // console.log(filterValue);
    
    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  toggleSidenav(){
    // console.log('toggle');
    //this.sidenavSvc.toggleSidenav();
    this.sidenavSvc.toggleSignal();
  }

  toResult(idProduct: string){
    this.router.navigate([`/products/${idProduct}`]);
  }

  changeLanguage(language: 'es' | 'en'){
    this.translateSvc.use(language);
  }
  
  goToCart(){
    if(this.isLoggedIn()){
      alert('Redirect to cart !');
    } else {
      this.router.navigateByUrl('auth/login');
    }
  }

  openUpdateDialog(userId: string){
    const dialogRef = this.dialogSvc.open(
      EditProfileDialogComponent,
      {
        user: {id: userId } as User,
        title: 'Account information'
      }
    );

    dialogRef.closed.subscribe(res => {
      if (res?.updated) {
        console.log('Dialog closed!');
        
      }
    })
  }

  logout(){
    this.authSvc.logout();
  }



}
