import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
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
import { ThemeService } from '../../../common/services/theme.service';

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
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {

  private isLoggedIn = signal(false);
  public isDarkMode = computed(()=>this.themeSvc.isDarkTheme());
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
    private themeSvc: ThemeService,
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

  toggleTheme(){
    this.themeSvc.toggleTheme();
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

  openUpdateDialog() {

    const userId = localStorage.getItem('userId');

    if (userId) {
      const dialogRef = this.dialogSvc.open(EditProfileDialogComponent, {
        user: { id: userId } as UserDomain,
        title: 'Account information',
      });
  
      dialogRef.closed.subscribe((res) => {
        if (res?.updated) {
          //console.log('Dialog closed!');
        }
      });
    }

  }

  logout() {
    this.authSvc.logout();
  }
}
