import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import {
  removeFromCart,
  updateItemQuantity,
} from '../../../auth/+state/user.actions';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ProductItem } from '../../../buys/domain/BuyDomain.model';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-shopping-cart-card',
  imports: [
    CommonModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    TranslatePipe,
  ],
  template: `
    <div class="cart__card fadeIn">
      @let item = itemData();
      <picture>
        <img class="cart__img" [src]="item.imageURL" [alt]="item.name" />
      </picture>

      <div class="cart__info">
        <h3 class="cart__title">{{ item.name }}</h3>
        <mat-form-field appearance="outline">
          <mat-label>{{ 'CART.item.label' | translate }}</mat-label>
          <mat-select
            matSelect
            (selectionChange)="onQuantityChange(item.id, $event.value)"
            [formControl]="itemQuantityControl"
            [value]="item.quantity"
          >
            <mat-option [value]="1">1</mat-option>
            <mat-option [value]="2">2</mat-option>
            <mat-option [value]="3">3</mat-option>
          </mat-select>
        </mat-form-field>

        @if (item.sale) {
          <span class="cart__price--dto">
            {{ item.price * getQuantity() | currency: '' : '$' : '1.0-0' }}
          </span>
          <span class="cart__price">
            {{ item.sale_price * getQuantity() | currency: '' : '$' : '1.0-0' }}
          </span>
        } @else {
          <span class="cart__price">
            {{ item.price * getQuantity() | currency: '' : '$' : '1.0-0' }}
          </span>
        }

        <button
          (click)="remove(item.id)"
          class="cart__btndelete"
          mat-icon-button
        >
          <mat-icon>delete</mat-icon>
        </button>
      </div>
    </div>
  `,
  styleUrl: './shopping-cart-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShoppingCartCardComponent implements OnInit {
  itemData = input.required<ProductItem>();
  private store = inject(Store);

  public itemQuantityControl = new FormControl();

  getQuantity() {
    return this.itemQuantityControl.value || 1;
  }

  ngOnInit(): void {
    this.itemQuantityControl.setValue(this.itemData().quantity);
  }

  remove(productId: string) {
    this.store.dispatch(removeFromCart({ productId }));
  }

  onQuantityChange(productId: string, quantity: number) {
    this.store.dispatch(updateItemQuantity({ productId, quantity }));
  }
}
