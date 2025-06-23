import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidenavComponent } from '../sidenav/sidenav.component';

@Component({
  selector: 'app-layout',
  imports: [HeaderComponent, SidenavComponent ],
  template: `
    <div>
      <app-header></app-header>
      <app-sidenav></app-sidenav>
    </div>
    
  `,
  styleUrl: './layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {}
