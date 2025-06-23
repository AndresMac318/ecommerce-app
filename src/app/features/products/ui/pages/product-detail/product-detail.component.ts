import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { getProductById, updateProductStock } from '../../../+state/product.actions';
import { selectProductById } from '../../../+state/product.selectors';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TranslatePipe } from '@ngx-translate/core';
import { addItemToCart } from '../../../../auth/+state/user.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthUseCaseService } from '../../../../auth/application/auth-usecase.service';
import { ActivatedRoute, Router } from '@angular/router';
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
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import Swal from 'sweetalert2';

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
              class="detail__img fadeIn"
              [src]="product.imageURL"
              [alt]="product.name"
              (error)="handleImageError($event)"
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
              <mat-label>{{ "PRODUCTS.product_detail.label_quantity" | translate }}</mat-label>
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
export class ProductDetailComponent {

  private store = inject(Store);
  private _snackBar = inject(MatSnackBar);
  private authSvc = inject(AuthUseCaseService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  
  private id = toSignal(this.route.params.pipe(map(params => params['id'])));
  readonly productDetail = this.store.selectSignal(selectProductById);

  public noImageUrl = '/img/no-image-web.jpg';
  public isFavorite = signal(false);

  public itemQuantityControl = new FormControl<number>(1, { nonNullable: true });

  constructor(){
    effect(() => {
      const currentId = this.id();
      if (currentId) {
        this.store.dispatch(getProductById({ id: currentId }));
      }
    });
  }

  handleImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = this.noImageUrl;
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
    const quantity = this.itemQuantityControl.value || 0;

    if (itemData) {

      //validate stock
      if (quantity > itemData.stock) {
        Swal.fire('Stock Insufficient', 'Not enough stock available', 'warning');
        return;
      }

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

    //validate auth
    if (!this.authSvc.isLoggedIn()) {
      this.router.navigate(['/auth/login']);
      return;
    }

    const productData = this.productDetail();
    const quantity = this.itemQuantityControl.value || 0;

    if (productData) {

      //validate stock
      if (quantity > productData.stock) {
        Swal.fire('Stock Insufficient', 'Not enough stock available', 'warning');
        return;
      }

      // build data buy
      const buyData: BuyDomain = {
        salesProducts: [
          {
            id: productData.id,
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

      // validate if BuySale
      if (productData.sale) {
        const saleBuyData = {
          ...buyData,
          VAT19: productData.sale_price * quantity * 0.19,
          subtotalSale: productData.sale_price * quantity - productData.sale_price * quantity * 0.19,
          amountSale: productData.sale_price * quantity,
        };
        
        // dispatch registerBuy
        this.store.dispatch(registerBuy({ buyData: saleBuyData }));
        
        this.store.dispatch(updateProductStock({ 
          id: productData.id, 
          stock: productData.stock - quantity 
        }));

        return this.store.dispatch(getProductById({ id: this.id() }));
      }

      // dispatch action in commonSale
      this.store.dispatch(registerBuy({ buyData}));
        
      //update stock commonSale
      this.store.dispatch(updateProductStock({ 
        id: productData.id, 
        stock: productData.stock - quantity 
      }));

      return this.store.dispatch(getProductById({ id: this.id() }));

    } else {
      console.error('No product data available');
      Swal.fire('Error', 'Product information not available', 'error');
      return;
    }
  }
}
