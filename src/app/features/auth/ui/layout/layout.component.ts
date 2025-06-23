import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { FooterComponent } from "../../../../shared/components/footer/footer.component";

@Component({
  selector: 'app-layout',
  imports: [RouterModule, HeaderComponent, FooterComponent],
  template: `
    <div class="container">
      <nav>
        <app-header></app-header>
      </nav>
      <div class="body">
        <router-outlet />
      </div>
      <div class="footer">
        <app-footer></app-footer>
      </div>
    </div>
  `,
  styleUrl: './layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {}
