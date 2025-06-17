import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Signal,
  signal,
} from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { AuthService } from '../../../features/auth/infrastructure/authAPI.service';
import { Router, RouterLink } from '@angular/router';
import { SidenavService } from '../../../common/services/sidenav.service';
import { DialogService } from '../../../common/services/dialog.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { EditProfileDialogComponent } from '../../../features/user/edit-profile-dialog/edit-profile-dialog.component';
import { UserDomain } from '../../../features/auth/domain/userDomain.model';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { map, Observable, startWith } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { OptionItem } from '../../../common/interfaces/optionItem.interface';
import { ProductUseCaseService } from '../../../features/products/application/product-usecase.service';
import { Store } from '@ngrx/store';
import { selectCartItemsCount } from '../../../features/auth/+state/user.selectors';

@Component({
  selector: 'app-header',
  imports: [
    ReactiveFormsModule,
    AsyncPipe,
    TranslatePipe,
    MatToolbarModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatBadgeModule,
    RouterLink,
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

      <a
        routerLink="/products"
        routerLinkActive="router-link-active"
        class="navbar__title"
        >WebMarket</a
      >

      <div class="formcontainer">
        <form class="form">
          <input
            class="form__input"
            name="searchInput"
            placeholder="{{
              'MAIN_COMPONENTS.header.input_placeholder' | translate
            }}"
            type="text"
            [formControl]="searchInput"
            [matAutocomplete]="auto"
          />
          <mat-autocomplete #auto="matAutocomplete">
            @for (option of filteredOptions | async; track option) {
              <mat-option [value]="option.name" (click)="toResult(option.id)">{{
                option.name
              }}</mat-option>
            } @empty {
              <mat-option>There arent's matching products</mat-option>
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
          <span>English</span>
        </button>
      </mat-menu>

      <button
        (click)="goToCart()"
        mat-icon-button
        class="example-icon"
        aria-label="Example icon-button with shopping_cart icon"
      >
        <mat-icon
          [matBadge]="numItemsCart"
          matBadgeSize="large"
          aria-hidden="shopping cart"
          >shopping_cart_checkout</mat-icon
        >
      </button>

      @if (authSvc.isLoggedIn()) {
        <button mat-icon-button [matMenuTriggerFor]="beforeMenu">
          <mat-icon>account_circle</mat-icon>
        </button>

        <mat-menu #beforeMenu="matMenu" xPosition="before">
          <button (click)="openUpdateDialog('23e7')" mat-menu-item>
            <mat-icon>manage_accounts</mat-icon>
            <span>{{ "MAIN_COMPONENTS.buttons.profile.profile" | translate }}</span>
          </button>
          <button (click)="logout()" mat-menu-item>
            <mat-icon>logout</mat-icon>
            <span>{{ "MAIN_COMPONENTS.buttons.profile.logout" | translate }}</span>
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
  public itemsCart: Signal<number>;

  constructor(
    public authSvc: AuthService,
    private productUseCaseSvc: ProductUseCaseService,
    private sidenavSvc: SidenavService,
    private router: Router,
    private translateSvc: TranslateService,
    private dialogSvc: DialogService,
    private store: Store
  ) {
    this.itemsCart = this.store.selectSignal(selectCartItemsCount);
  }

  get numItemsCart() {
    if (this.authSvc.isLoggedIn() && this.itemsCart() > 0) {
      return this.itemsCart();
    }
    return null;
  }

  ngOnInit(): void {
    const logged = localStorage.getItem('isLoggedIn');

    if (logged === 'true') {
      this.isLoggedIn.set(true);
    }

    this.productUseCaseSvc
      .getProducts()
      .pipe(
        map((products) =>
          products.map((product) => ({
            id: product.id,
            name: product.name,
          }))
        )
      )
      .subscribe((res) => {
        this.options = res;
      });

    this.filteredOptions = this.searchInput.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  private _filter(value: string): OptionItem[] {
    const filterValue = value.toLowerCase();
    return this.options.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  toggleSidenav() {
    this.sidenavSvc.toggleSignal();
  }

  toResult(idProduct: string) {
    this.router.navigate([`/products/${idProduct}`]);
  }

  changeLanguage(language: 'es' | 'en') {
    this.translateSvc.use(language);
  }

  goToCart() {
    if (this.isLoggedIn()) {
      this.router.navigateByUrl('shopping-cart');
    } else {
      this.router.navigateByUrl('auth/login');
    }
  }

  openUpdateDialog(userId: string) {
    const dialogRef = this.dialogSvc.open(EditProfileDialogComponent, {
      user: { id: userId } as UserDomain,
      title: 'Account information',
    });

    dialogRef.closed.subscribe((res) => {
      if (res?.updated) {
        console.log('Dialog closed!');
      }
    });
  }

  logout() {
    this.authSvc.logout();
  }
}
