import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-add-cart',
  imports: [ MatButtonModule, MatIconModule, TranslatePipe],
  template: `
    <button mat-raised-button class="w100">
      <mat-icon>add_shopping_cart</mat-icon
      >{{ 'MAIN_COMPONENTS.buttons.add_cart' | translate }}
    </button>
  `,
  styleUrl: './addCart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCartComponent { }
