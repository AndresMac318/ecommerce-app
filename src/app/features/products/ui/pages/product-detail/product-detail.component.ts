import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { getProductById } from '../../../+state/product.actions';
import { selectProductById } from '../../../+state/product.selectors';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TranslatePipe } from '@ngx-translate/core';
import { addItemToCart } from '../../../../auth/+state/user.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthUseCaseService } from '../../../../auth/application/auth-usecase.service';
import { Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  BuyDomain,
  ProductItem,
} from '../../../../buys/domain/BuyDomain.model';
import { registerBuy } from '../../../../buys/+state/buy.actions';
import { NavigationBackComponent } from '../../../../../shared/components/buttons/navigation-back/navigation-back.component';
import { BuyComponent } from '../../../../../shared/components/buttons/buy/buy.component';
import { AddCartComponent } from "../../../../../shared/components/buttons/addCart/addCart.component";

@Component({
  selector: 'app-product-detail',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
    CommonModule,
    TranslatePipe,
    NavigationBackComponent,
    BuyComponent,
    AddCartComponent
],
  template: `
    <div class="detail">
      @let product = productDetail();
      @if (product) {
        <div class="detail__header">
          <app-navigation-back />
          <h3>{{ product.name }}</h3>
          <span>{{ product.category }}</span>
        </div>

        <div class="detail__contain">
          <picture class="detail__picture">
            <img
              class="detail__img"
              [src]="product.imageURL"
              [alt]="product.name"
            />
          </picture>

          <div class="detail__info">
            <div class="detail__prices">
              <div class="detail__pricebox">
                <span
                  [class]="
                    product.sale !== false
                      ? 'detail__price--dto'
                      : 'detail__price'
                  "
                >
                  {{ product.price | currency: 'COP' : 'COP $' : '1.0-0' }}
                </span>
                @if (product.sale_price) {
                  <span class="detail__price"
                    >{{
                      product.sale_price | currency: 'COP' : 'COP $' : '1.0-0'
                    }}
                  </span>
                }
              </div>
              <button
                (click)="toggleFavorite($event)"
                class="detail__favoritebtn"
                mat-icon-button
              >
                <mat-icon
                  [class]="
                    isFavorite() ? 'detail__maticon--select' : 'detail__maticon'
                  "
                  size="large"
                  >favorite</mat-icon
                >
              </button>
            </div>

            @if (product.stock > 0) {
              <span class="detail__stock"
                >{{ 'PRODUCTS.product_detail.stock' | translate
                }}<span style="color: gray;"
                  >( {{ product.stock }} uni )</span
                ></span
              >
            } @else {
              <span class="detail__stock">{{
                'PRODUCTS.product_detail.no_stock' | translate
              }}</span>
            }

            <mat-form-field appearance="outline">
              <mat-label>Quantity</mat-label>
              <mat-select
                matSelect
                [formControl]="itemQuantityControl"
                [value]="1"
              >
                <mat-option [value]="1">1</mat-option>
                <mat-option [value]="2">2</mat-option>
                <mat-option [value]="3">3</mat-option>
              </mat-select>
            </mat-form-field>

            <span style="width: 100%; margin: 0 0 12px 0;">{{
              'PRODUCTS.product_detail.text' | translate
            }}</span>

            <div class="detail__buttons">
              <app-buy (click)="registerBuy()" ></app-buy>
              <app-add-cart (click)="addToCart()" ></app-add-cart>
            </div>
          </div>
        </div>

        <h4 style="margin-bottom: 10px;">
          {{ 'PRODUCTS.product_detail.description' | translate }}
        </h4>
        <p class="detail__description">{{ product.description }}</p>
      }
    </div>
  `,
  styleUrl: './product-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailComponent implements OnInit {
  @Input() id!: string;

  private store = inject(Store);
  private _snackBar = inject(MatSnackBar);
  private authSvc = inject(AuthUseCaseService);
  private router = inject(Router);

  public itemQuantityControl = new FormControl<number>(1, {
    nonNullable: true,
  });

  isFavorite = signal(false);

  readonly productDetail = this.store.selectSignal(selectProductById);

  ngOnInit(): void {
    this.store.dispatch(getProductById({ id: this.id }));
  }

  toggleFavorite(event: MouseEvent) {
    event.stopPropagation();
    this.isFavorite.update((value) => !value);
  }

  addToCart() {
    if (!this.authSvc.isLoggedIn()) {
      this.router.navigate(['/auth/login']);
      return;
    }

    const itemData = this.productDetail();

    if (itemData) {
      const cartItem: ProductItem = {
        id: itemData.id,
        price: itemData.price,
        name: itemData.name,
        imageURL: itemData.imageURL,
        quantity: 1,
        sale: itemData.sale,
        sale_price: itemData.sale_price,
      };

      const storeUserStr = localStorage.getItem('user');

      if (storeUserStr) {
        const storeUser = JSON.parse(storeUserStr);
        const alreadyInCart = storeUser.cart.some(
          (p: ProductItem) => p.id === cartItem.id
        );

        if (alreadyInCart) {
          this._snackBar.open('Product already in cart!', 'Ok', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
          return;
        }
      }

      this.store.dispatch(addItemToCart({ item: cartItem }));
    }
  }

  registerBuy() {
    if (!this.authSvc.isLoggedIn()) {
      this.router.navigate(['/auth/login']);
      return;
    }

    const productData = this.productDetail();
    const quantity = this.itemQuantityControl.value || 0;
    if (productData) {
      const buyData: BuyDomain = {
        salesProducts: [
          {
            id: this.id,
            price: productData.price,
            name: productData.name,
            imageURL: productData.imageURL,
            quantity: Number(this.itemQuantityControl.value) || 0,
            sale: productData.sale,
            sale_price: productData.sale_price,
          },
        ],
        idUser: localStorage.getItem('userId') || '0',
        VAT19: productData.price * quantity * 0.19,
        subtotalSale: productData.price * quantity - productData.price * quantity * 0.19,
        amountSale: productData.price * quantity,
        paidType: 'TRANSFER',
        dateSale: new Date().toISOString(),
        state: 'SUCCESS',
      };
      if (productData.sale) {
        const saleBuyData = {
          ...buyData,
          VAT19: productData.sale_price * quantity * 0.19,
          subtotalSale: productData.sale_price * quantity - productData.sale_price * quantity * 0.19,
          amountSale: productData.sale_price * quantity,
        };
        return this.store.dispatch(registerBuy({ buyData: saleBuyData }));
      }
      return this.store.dispatch(registerBuy({ buyData }));
    } else {
      console.log('There are not product data');
    }
  }
}
