import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-buy',
  imports: [ MatButtonModule, MatIconModule, TranslatePipe ],
  template: `
    <button mat-flat-button [class]="styleRule" >
      <mat-icon>shopping_bag</mat-icon
      >{{ 'MAIN_COMPONENTS.buttons.buy' | translate }}
    </button>
  `,
  styleUrl: './buy.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuyComponent {
  
  styleType = input<string>();

  get styleRule(){
    if(this.styleType() === 'cart'){
      return 'wCart';
    } else {
      return 'w100';
    }
  }
}
