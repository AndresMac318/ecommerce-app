import { CurrencyPipe, DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { BuyDomain } from '../../../domain/BuyDomain.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buy-item-card',
  standalone: true,
  imports: [CurrencyPipe, DatePipe],
  template: `
    <div
      class="buys__card"
      (click)="goToDetail(buyItem.id)"
      (keyup.enter)="goToDetail(buyItem.id)"
      tabindex="0"
      role="button"
    >
      @let buyItem = buyItemData();
      <img
        [src]="buyItem.salesProducts[0].imageURL"
        alt="product image"
        height="40px"
      />
      <span>{{
        buyItem.amountSale | currency: 'COP' : 'COP $' : '1.0-0'
      }}</span>
      <span
        [class]="
          buyItem.state === 'SUCCESS'
            ? 'buys__salesuccess'
            : 'buys__salefailure'
        "
        >{{ buyItem.state }}</span
      >
      <span>{{ buyItem.dateSale | date: 'dd MMM yyyy, hh:mm aa' }}</span>
    </div>
  `,
  styleUrl: './buy-item-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuyItemCardComponent {
  buyItemData = input.required<BuyDomain>();
  private router = inject(Router);

  goToDetail(id = '0') {
    this.router.navigate(['buys', id]);
  }
}
