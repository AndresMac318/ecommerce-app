import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  inject,
  Input,
  signal,
} from '@angular/core';
import { BuyUsecaseService } from '../../../application/buy-usecase.service';
import { BuyDomain } from '../../../domain/BuyDomain.model';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationBackComponent } from '../../../../../shared/components/buttons/navigation-back/navigation-back.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-buy-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatDividerModule,
    TranslatePipe,
    NavigationBackComponent,
  ],
  template: `
    <section class="buyDetail">
      <app-navigation-back />
      <h2 class="buyDetail__title">
        {{ 'BUYS.buy_detail.title' | translate }}
      </h2>

      <div class="buyDetail__container">
        <ul>
          @if (buyData(); as data) {
            @for (item of data.salesProducts; track item.id) {
              <li class="buyDetail__li">
                <picture>
                  <img
                    [src]="item.imageURL"
                    alt="Product image"
                    height="60px"
                  />
                </picture>
                <ul>
                  <li class="buyDetail__name">{{ item.name }}</li>
                  @if (item.sale) {
                    <li class="buyDetail__price">
                      {{
                        item.sale_price | currency: 'COP' : 'COP $' : '0.0-0'
                      }}
                      <span class="buyDetail__price--nosale">{{
                        item.price | currency: 'COP' : '$' : '1.0-0'
                      }}</span>
                    </li>
                  } @else {
                    <li class="buyDetail__price">
                      {{ item.price | currency: 'COP' : 'COP $' : '1.0-0' }}
                    </li>
                  }
                  <li class="buyDetail__quantity">{{ item.quantity }} item</li>
                </ul>
              </li>
            }

            <mat-divider></mat-divider>

            <ul class="buyDetail__total">
              <li class="buyDetail__totalItem">
                <span class="buyDetail__totalLabel">
                  {{ 'BUYS.buy_detail.resume_buy.iva' | translate }}%</span
                >
                <span>{{
                  data.VAT19 | currency: 'COP' : 'COP $' : '1.0-0'
                }}</span>
              </li>
              <li class="buyDetail__totalItem">
                <span class="buyDetail__totalLabel">
                  {{ 'BUYS.buy_detail.resume_buy.subtotal' | translate }}</span
                >
                <span>{{
                  data.subtotalSale | currency: 'COP' : 'COP $' : '1.0-0'
                }}</span>
              </li>
              <li class="buyDetail__totalItem">
                <span class="buyDetail__totalLabel">
                  {{ 'BUYS.buy_detail.resume_buy.amount' | translate }}</span
                >
                <span>{{
                  data.amountSale | currency: 'COP' : 'COP $' : '1.0-0'
                }}</span>
              </li>
              <li class="buyDetail__totalItem">
                <span class="buyDetail__totalLabel">
                  {{ 'BUYS.buy_detail.resume_buy.payment' | translate }}</span
                >
                <span>{{ data.paidType }}</span>
              </li>
              <li class="buyDetail__totalItem">
                <span class="buyDetail__totalLabel">
                  {{ 'BUYS.buy_detail.resume_buy.date' | translate }}</span
                >
                <span>{{ data.dateSale | date: 'dd MMM yyyy, hh:mm aa' }}</span>
              </li>
            </ul>
          } @else {
            @if (isLoading()) {
              <p>Loading...</p>
            } @else {
              <span>There is no data to display</span>
            }
          }
        </ul>
      </div>
    </section>
  `,
  styleUrl: './buy-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuyDetailComponent {
  @Input({ required: true })
  set id(value: string) {
    this.idSignal.set(value);
  }

  private idSignal = signal<string>('');

  buyData = signal<BuyDomain | null>(null);
  isLoading = signal(true);

  private buysUseCaseSvc = inject(BuyUsecaseService);
  private destroyRef = inject(DestroyRef);

  constructor() {
    effect((onCleanup) => {
      const id = this.idSignal();
      if (!id) return;

      this.isLoading.set(true);

      const sub = this.buysUseCaseSvc
        .getBuyById(id)
        .pipe(
          finalize(() => this.isLoading.set(false)),
          takeUntilDestroyed(this.destroyRef)
        )
        .subscribe({
          next: (res) => this.buyData.set(res),
          error: () => {
            this.buyData.set(null);
            this.isLoading.set(false);
          },
        });

      onCleanup(() => sub.unsubscribe());
    });
  }
}
