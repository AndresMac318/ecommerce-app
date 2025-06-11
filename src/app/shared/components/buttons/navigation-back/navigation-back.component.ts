import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-navigation-back',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, TranslatePipe],
  template: `
    <button (click)="goBack()" mat-button>
      <mat-icon>arrow_back</mat-icon
      >{{ 'MAIN_COMPONENTS.buttons.back' | translate }}
    </button>
  `,
  styleUrl: './navigation-back.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationBackComponent {
  private location = inject(Location);

  goBack() {
    this.location.back();
  }
}
