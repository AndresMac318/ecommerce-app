import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCartItems, selectCartTotal } from '../../auth/+state/user.selectors';
import { CommonModule } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { removeFromCart, updateItemQuantity } from '../../auth/+state/user.actions';
import { ShoppingCartCardComponent } from '../components/shopping-cart-card/shopping-cart-card.component';

@Component({
  selector: 'app-shopping-cart',
  imports: [ CommonModule, MatSelectModule, MatIconModule, TranslatePipe, MatButtonModule, MatListModule, ReactiveFormsModule, ShoppingCartCardComponent ],
  template: `
    <section class="cart">
      <h2 class="cart__title">{{ "CART.title" | translate }}</h2>

      @for (item of cartItems(); track $index) {

        <app-shopping-cart-card [itemData]="item" />

        <!-- <div class="cart__card fadeIn">
          <picture>
            <img
              class="cart__img"
              [src]="item.imageURL"
              [alt]="item.name"
            />
          </picture>
  
          <div class="cart__info">
            <h3 class="cart__title">{{ item.name }}</h3>
            <mat-form-field appearance="outline">
              <mat-label>Quantity</mat-label>
              <mat-select matSelect
                (selectionChange)="onQuantityChange(item.productId, $event.value)" 
                [formControl]="itemQuantityControls.get(item.productId)!" 
                [value]="item.quantity"
              >
                <mat-option [value]="1">1</mat-option>
                <mat-option [value]="2">2</mat-option>
                <mat-option [value]="3">3</mat-option>
              </mat-select>
            </mat-form-field>
  
            <span class="cart__price">
              {{ item.price * getQuantity(item.productId) | currency: '' : '$' : '1.0-0' }}
            </span>

            <button (click)="remove(item.productId)" class="cart__btndelete" mat-icon-button>
              <mat-icon>delete</mat-icon>
            </button>
          
          </div>
        </div> -->

      } @empty {
        <div>{{ "CART.item.no_items" | translate }}</div>
      }

      <div class="cart__details fadeIn">
      
        <mat-list>
          <mat-list-item><span>{{ "CART.details.tax" | translate }}: <b> {{ cartTotalAmount()* 0.19 | currency: '' : '$' : '1.0-0' }} </b></span></mat-list-item>
          <mat-list-item><span>{{ "CART.details.total" | translate }}:  <b>{{ cartTotalAmount() | currency: '' : '$' : '1.0-0' }}</b></span></mat-list-item>
        </mat-list>

        <button (click)="buy()" class="cart__btn" mat-flat-button>
          <mat-icon>shopping_bag</mat-icon>
          {{ 'MAIN_COMPONENTS.buttons.buy' | translate }}
        </button>
      
      </div>
    </section>
  `,
  styleUrl: './shopping-cart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShoppingCartComponent implements OnInit {
  
  private store = inject(Store);
  
  cartItems = this.store.selectSignal(selectCartItems);
  cartTotalAmount = this.store.selectSignal(selectCartTotal);

  public itemQuantityControls = new Map<string, FormControl<number | null>>();
 
  /* getQuantity(productId: string){
    return this.itemQuantityControls.get(productId)?.value || 1;
  } */
  
  ngOnInit(): void {
    this.cartItems().forEach(item => {
      this.itemQuantityControls.set(item.productId, new FormControl(item.quantity));
    });
  }
  
  /* remove(productId: string){
    this.store.dispatch(removeFromCart({ productId }));
  }

  onQuantityChange(productId: string, quantity: number){
    //console.log(productId, quantity);
    this.store.dispatch(updateItemQuantity({ productId, quantity }));
  } */

  buy(): void {
    console.log(this.cartItems());
  }
  
}
