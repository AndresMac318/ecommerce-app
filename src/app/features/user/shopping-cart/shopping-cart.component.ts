import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCartItems } from '../../auth/+state/user.selectors';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ShoppingCartCardComponent } from '../components/shopping-cart-card/shopping-cart-card.component';
import { BuyDomain, ProductItem } from '../../buys/domain/BuyDomain.model';
import { registerBuy } from '../../buys/+state/buy.actions';
import { NavigationBackComponent } from '../../../shared/components/buttons/navigation-back/navigation-back.component';

import Swal from 'sweetalert2';
import { BuyComponent } from "../../../shared/components/buttons/buy/buy.component";

@Component({
  selector: 'app-shopping-cart',
  imports: [
    CommonModule,
    MatSelectModule,
    MatIconModule,
    TranslatePipe,
    MatButtonModule,
    MatListModule,
    ReactiveFormsModule,
    ShoppingCartCardComponent,
    NavigationBackComponent,
    BuyComponent
],
  template: `
    <section class="cart">
      <app-navigation-back />
      <h2 class="cart__title">{{ 'CART.title' | translate }}</h2>
      @let products = cartItems();

      @if (products.length > 0){

        @for (item of products; track $index) {
          <app-shopping-cart-card [itemData]="item" />
        }

        <div class="cart__details fadeIn">
          <mat-list>
            <mat-list-item>
              <span>
                Sub total:
                <b>{{ cartSubtotal() | currency: '' : '$' : '1.0-0' }}</b>
              </span>
            </mat-list-item>
            <mat-list-item>
              <span>
                {{ 'CART.details.tax' | translate }}:
                <b>{{ cartTax() | currency: '' : '$' : '1.0-0' }}</b>
              </span>
            </mat-list-item>
            <mat-list-item>
              <span>
                {{ 'CART.details.total' | translate }}:
                <b>{{ cartTotal() | currency: '' : '$' : '1.0-0'}}</b>                
              </span>
            </mat-list-item>
          </mat-list>
          <app-buy (click)="buy()" [styleType]="'cart'" ></app-buy>
        </div>

      }@else {
        <div class="cart__details fadeIn">
          {{ 'CART.item.no_items' | translate }}
        </div>
      }
      
    </section>
  `,
  styleUrl: './shopping-cart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShoppingCartComponent implements OnInit {
  private store = inject(Store);

  cartItems = this.store.selectSignal(selectCartItems);

  cartTax = computed(() => this.computeMounts(this.cartItems()) * 0.19);
  cartSubtotal = computed(() => this.cartTotal() - this.cartTax());
  cartTotal = computed(() => this.computeMounts(this.cartItems()));

  public itemQuantityControls = new Map<string, FormControl<number | null>>();

  ngOnInit(): void {
    this.cartItems().forEach((item) => {
      this.itemQuantityControls.set(item.id, new FormControl(item.quantity));
    });
  }

  buy(): void {
    const productsData: ProductItem[] = this.cartItems();
    if (productsData) {
      if (productsData.length < 1) {
        Swal.fire('Alert', 'There are not items in the cart!', 'info');
        return;
      }
      const buyData: BuyDomain = {
        salesProducts: productsData,
        idUser: localStorage.getItem('userId') || '0',
        VAT19: this.computeMounts(productsData) * 0.19,
        subtotalSale: this.computeMounts(productsData) - this.computeMounts(productsData)*0.19,
        amountSale: this.computeMounts(productsData),
        paidType: 'TRANSFER',
        dateSale: new Date().toISOString(),
        state: 'SUCCESS',
      };
      console.log(buyData);
      this.store.dispatch(registerBuy({ buyData }));
    } else {
      console.log('There are not product data');
    }
  }

  computeMounts(data: ProductItem[]): number {
    return data.reduce((total, product) => {
      const price = product.sale ? product.sale_price: product.price;
      return total + (price * product.quantity);
    }, 0);
  }
  
  /* computeMounts(data: ProductItem[]): number {
    let total = 0;
    data.forEach((product) => {
      if (product.sale) {
        total += product.sale_price * product.quantity;
      } else {
        total += product.price * product.quantity;
      }
    });
    return total;
  } */
}
