import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../../../shared/components/header/header.component';

@Component({
  selector: 'app-layout',
  imports: [RouterModule, HeaderComponent],
  template: `
    <nav>
      <app-header></app-header>
    </nav>
    <div class="container">
      <router-outlet />
    </div>
  `,
  styleUrl: './layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {}
