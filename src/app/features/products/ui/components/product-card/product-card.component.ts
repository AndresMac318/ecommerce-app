import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  signal,
} from '@angular/core';
import { ProductDomain } from '../../../domain/productDomain.model';
import { CurrencyPipe, SlicePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  imports: [MatButtonModule, MatIconModule, SlicePipe, CurrencyPipe],
  template: `
    <div class="card" (click)="toDetail(product.id)">
      @let product = productData();
   
      <picture>
        <img
          class="card__img"
          [src]="product.imageURL"
          [alt]="product.name"
        />
      </picture>
  
      <div class="card__info">
        <h3 class="card__title">{{ product.name }}</h3>
        <p class="card__description">
          {{ product.description | slice: 0 : 100 }}...
        </p>
        <span
          [class]="product.sale !== false ? 'card__price--dto' : 'card__price'"
        >
          {{ product.price | currency: 'COP' : 'COP $' : '1.0-0' }}
        </span>
        @if (product.sale_price) {
          <span class="card__price"
            >{{ product.sale_price | currency: 'COP' : 'COP $' : '1.0-0' }}
          </span>
        }
        <button
          (click)="toggleFavorite($event)"
          [class]="
            isFavorite() ? 'card__favoritebtn--active' : 'card__favoritebtn'
          "
          mat-icon-button
        >
          <mat-icon
            [class]="isFavorite() ? 'card__maticon--select' : 'card__maticon'"
            >favorite</mat-icon
          >
        </button>
      </div>
    </div>
  `,
  styleUrl: './product-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {
  private router = inject(Router);

  productData = input.required<ProductDomain>();
  isFavorite = signal(false);

  toggleFavorite(event: MouseEvent) {
    event.stopPropagation();
    this.isFavorite.update((value) => !value);
  }

  toDetail(id: string) {
    this.router.navigate([`/products/${id}`]);
  }
}
