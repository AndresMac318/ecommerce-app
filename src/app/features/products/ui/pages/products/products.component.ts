import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { changePage, getProducts } from '../../../+state/product.actions';
import {
  selectCurrentProducts,
  selectProductPagination,
  selectProductsLoading,
} from '../../../+state/product.selectors';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';
import { MatSliderModule } from '@angular/material/slider';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductsFiltersComponent } from '../../components/products-filters/products-filters.component';
import { MatIconModule } from '@angular/material/icon';

import { trigger, transition, style, animate } from '@angular/animations';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-products',
  imports: [
    ReactiveFormsModule,
    ProductCardComponent,
    MatMenuModule,
    MatButtonModule,
    MatRadioModule,
    MatDividerModule,
    MatSliderModule,
    ProductsFiltersComponent,
    MatIconModule,
    TranslatePipe,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-206px)' }),
        animate(
          '300ms ease-in-out',
          style({ opacity: 1, transform: 'translateX(0)' })
        ),
      ]),
      transition(':leave', [
        animate(
          '300ms ease-in-out',
          style({ opacity: 0, transform: 'translateX(-206px)' })
        ),
      ]),
    ]),
  ],
})
export class ProductsComponent implements OnInit {
  private store = inject(Store);

  public readonly products = this.store.selectSignal(selectCurrentProducts);
  public loading = this.store.selectSignal(selectProductsLoading);
  public pagination = this.store.selectSignal(selectProductPagination);

  public showFilters = signal(false);

  public changePage(page: number) {
    this.store.dispatch(changePage({ page }));
  }

  public getPages(pagination: { totalItems: number; pageSize: number }) {
    return Array.from(
      { length: Math.ceil(pagination.totalItems / pagination.pageSize) },
      (_, i) => i + 1
    );
  }

  ngOnInit(): void {
    const filterCollapse = localStorage.getItem(
      'appKit_ecommerce/filtersCollapse'
    );
    if (filterCollapse) {
      this.showFilters.set(JSON.parse(filterCollapse));
    }
    this.store.dispatch(getProducts({}));
  }

  toggleFilters() {
    this.showFilters.update((value) => !value);
    localStorage.setItem(
      'appKit_ecommerce/filtersCollapse',
      this.showFilters() + ''
    );
  }
}
