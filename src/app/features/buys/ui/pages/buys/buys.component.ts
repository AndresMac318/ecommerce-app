import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Store } from '@ngrx/store';
import { selectBuysByUserId } from '../../../+state/buy.selectors';
import { getBuysByClient } from '../../../+state/buy.actions';
import { BuyItemCardComponent } from '../../components/buy-item-card/buy-item-card.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-buys',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    BuyItemCardComponent,
    TranslatePipe,
  ],
  templateUrl: './buys.component.html',
  styleUrl: './buys.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuysComponent {
  private store = inject(Store);
  private userId = '';

  public readonly buysData$ = this.store.selectSignal(selectBuysByUserId());

  constructor() {
    // Assign the data to the data source for the table to render

    const userId = localStorage.getItem('userId');
    if (userId) {
      this.userId = userId;
      this.store.dispatch(getBuysByClient({ clientId: userId }));
    }
  }
}
