import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  ViewChild,
} from '@angular/core';

import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { SidenavService } from '../../../common/services/sidenav.service';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { TranslatePipe } from '@ngx-translate/core';
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatButtonModule,
    RouterModule,
    RouterOutlet,
    MatIconModule,
    MatMenuModule,
    TranslatePipe,
    FooterComponent
],
  template: `
    <mat-drawer-container class="container" autosize>
      <mat-drawer #drawer class="example-sidenav" mode="side">
        <ul class="menu">
          <li>
            <a
              class="menu__item"
              routerLink="/products"
              routerLinkActive="menu__selected"
            >
              <mat-icon>local_mall</mat-icon>
              {{ 'MAIN_COMPONENTS.sidenav.items.item1' | translate }}
            </a>
          </li>
          <li>
            <a
              class="menu__item"
              routerLink="/buys"
              routerLinkActive="menu__selected"
            >
              <mat-icon>shopping_cart</mat-icon>
              {{ 'MAIN_COMPONENTS.sidenav.items.item2' | translate }}
            </a>
          </li>
          <li>
            <a class="menu__item">
              <mat-icon>sell</mat-icon>
              {{ 'MAIN_COMPONENTS.sidenav.items.item3' | translate }}
            </a>
          </li>
          <li>
            <a class="menu__item">
              <mat-icon>history</mat-icon>
              {{ 'MAIN_COMPONENTS.sidenav.items.item4' | translate }}
            </a>
          </li>
          <li>
            <a class="menu__item">
              <mat-icon>favorite</mat-icon>
              {{ 'MAIN_COMPONENTS.sidenav.items.item5' | translate }}
            </a>
          </li>
        </ul>
      </mat-drawer>
      <mat-drawer-content class="drawer-container">
        <router-outlet />
        <app-footer></app-footer>
      </mat-drawer-content>
    </mat-drawer-container>
  `,
  styleUrl: './sidenav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavComponent implements AfterViewInit {
  @ViewChild('drawer') drawer!: MatDrawer;
  showFiller = false;

  private sidenavSvc = inject(SidenavService);

  constructor() {
    effect(() => {
      this.sidenavSvc.toggleSidenavSignal();
      this.toggle();
    });
  }

  toggle() {
    if (this.drawer) {
      this.drawer.toggle();
    }
  }

  ngAfterViewInit(): void {
    // Verify if there is a initial value and apdate the drawer
    if (this.sidenavSvc.toggleSidenavSignal()) {
      this.drawer.open();
    } else {
      this.drawer.close();
    }
  }
}
