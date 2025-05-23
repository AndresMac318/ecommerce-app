import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
  signal,
} from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { getProductById } from '../../../+state/product.actions';
import { selectProductById } from '../../../+state/product.selectors';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TranslatePipe } from '@ngx-translate/core';
import { addItemToCart } from '../../../../auth/+state/user.actions';
import { CartItem } from '../../../../auth/domain/userDomain.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthUseCaseService } from '../../../../auth/application/auth-usecase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  imports: [MatIconModule, MatButtonModule, CommonModule, TranslatePipe],
  template: `
    <div class="detail">
      @let product = productDetail();
      @if (product) {
        <div class="detail__header">
          <button (click)="goBack()" mat-button>
            <mat-icon>arrow_back</mat-icon
            >{{ 'MAIN_COMPONENTS.buttons.back' | translate }}
          </button>
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

            <span style="width: 100%; margin: 0 0 12px 0;">{{
              'PRODUCTS.product_detail.text' | translate
            }}</span>

            <div class="detail__buttons">
              <button mat-flat-button>
                <mat-icon>shopping_bag</mat-icon
                >{{ 'MAIN_COMPONENTS.buttons.buy' | translate }}
              </button>
              <button (click)="addToCart()" mat-raised-button>
                <mat-icon>add_shopping_cart</mat-icon
                >{{ 'MAIN_COMPONENTS.buttons.add_cart' | translate }}
              </button>
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
  private location = inject(Location);
  private authSvc = inject(AuthUseCaseService);
  private router = inject(Router);

  isFavorite = signal(false);

  readonly productDetail = this.store.selectSignal(selectProductById);

  ngOnInit(): void {
    this.store.dispatch(getProductById({ id: this.id }));
  }

  toggleFavorite(event: MouseEvent) {
    event.stopPropagation();
    this.isFavorite.update((value) => !value);
  }

  goBack() {
    this.location.back();
  }

  addToCart(){

    if(!this.authSvc.isLoggedIn()){
      this.router.navigate(['/auth/login']);
      return;
    }

    if(this.productDetail()){
      
      const cartItem: CartItem = {
        productId: this.productDetail()!.id,      
        quantity: 1,
        price: this.productDetail()!.price,
        name: this.productDetail()!.name,
        imageURL: this.productDetail()!.imageURL
      };

      const storeUserStr = localStorage.getItem('user');

      if (storeUserStr) {
        const storeUser = JSON.parse(storeUserStr);
        const alreadyInCart  = storeUser.cart.some((p:any) => p.productId === cartItem.productId);
      
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
}
