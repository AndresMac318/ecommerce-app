import { CurrencyPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDivider } from '@angular/material/divider';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';
import { Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { applyFilters } from '../../../+state/product.actions';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-products-filters',
  imports: [
    ReactiveFormsModule,
    MatRadioModule,
    MatSliderModule,
    MatDivider,
    TranslatePipe,
    CurrencyPipe,
  ],
  template: `
    <div class="filters">
      <form [formGroup]="filterForm">
        <h4 class="filters__title">
          {{ 'PRODUCTS.filter_menu.title1' | translate }}
        </h4>
        <mat-radio-group
          aria-labelledby="example-radio-group-label"
          class="filters__radiogroup"
          formControlName="category"
        >
          @for (category of categories; track $index) {
            <mat-radio-button
              class="filters__categoryitem"
              [value]="category"
              >{{ category }}</mat-radio-button
            >
          }
        </mat-radio-group>

        <mat-divider></mat-divider>

        <h4 class="filters__title">
          {{ 'PRODUCTS.filter_menu.title2' | translate }}
        </h4>

        <span style="margin: 0 10px 0 0;"
          >{{ minPrice | currency: 'COP' : '$' : '1.0-0' }} to
          {{ maxPrice | currency: 'COP' : '$' : '1.0-0' }}</span
        >

        <mat-slider min="1000" max="10000000" step="1000">
          <input formControlName="minPrice" value="1000" matSliderStartThumb />
          <input formControlName="maxPrice" value="500000" matSliderEndThumb />
        </mat-slider>
      </form>
    </div>
  `,
  styleUrl: './products-filters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsFiltersComponent implements OnInit {
  private store = inject(Store);

  public filterForm = new FormGroup({
    category: new FormControl(''),
    minPrice: new FormControl(10000),
    maxPrice: new FormControl(5000000),
  });

  public categories = [
    "jewelery",
    "electronics",
    "men's clothing",
    "women's clothing",
  ];

  get minPrice() {
    return this.filterForm.controls['minPrice'].value;
  }

  get maxPrice() {
    return this.filterForm.controls['maxPrice'].value;
  }

  ngOnInit(): void {
    if (localStorage.getItem('appKit_ecommerce/filtersData')) {
      const filtersData = JSON.parse(
        localStorage.getItem('appKit_ecommerce/filtersData')!
      );
      this.filterForm.controls['category'].setValue(filtersData.category);
      this.filterForm.controls['minPrice'].setValue(filtersData.priceRange[0]);
      this.filterForm.controls['maxPrice'].setValue(filtersData.priceRange[1]);
    }
    this.filterForm.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(({ category, minPrice, maxPrice }) => {

        this.store.dispatch(
          applyFilters({
            filters: {
              category: category,
              priceRange: [minPrice || 10000, maxPrice || 10000000],
            },
          })
        );
      });
  }
}
