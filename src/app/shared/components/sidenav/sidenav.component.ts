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
              [routerLinkActiveOptions]="{ exact: false }"
            >
              <mat-icon>local_mall</mat-icon>
              {{ 'MAIN_COMPONENTS.sidenav.items.item1' | translate }}
            </a>
          </li>
          <!-- <li (click)="showFiller = !showFiller" mat-raised-button>
            <mat-icon>shopping_cart</mat-icon>
            <a routerlink="">Products</a><mat-icon>chevron_right</mat-icon>
          </li> -->
          <!-- @if (showFiller) {
            <ul style="margin-left: 10px;">
              <li>
                <mat-icon>styler</mat-icon>
                <a routerlink="">Men's clothing</a>
              </li>
              <li>
                <mat-icon>styler</mat-icon>
                <a routerlink="">Woman's clothing</a>
              </li>
              <li>
                <mat-icon>diamond</mat-icon>
                <a routerlink="">Jewelry</a>
              </li>
              <li>
                <mat-icon>devices</mat-icon>
                <a routerlink="">Technology</a>
              </li>
            </ul>
          } -->

          <!-- <li mat-menu-item [matMenuTriggerFor]="categories">
            <mat-icon>shopping_cart</mat-icon>
            <a routerlink="">Products</a>
          </li>

          <mat-menu #categories="matMenu">
            <button mat-menu-item>Men's clothing</button>
            <button mat-menu-item>Women's clothing</button>
            <button mat-menu-item>Jewelery</button>
            <button mat-menu-item>Electronics</button>
          </mat-menu> -->
          <!-- <li>
            <mat-icon>sell</mat-icon>
            <a routerlink="">Sales</a>
          </li> -->
          <li>
            <a class="menu__item" routerlink="">
              <mat-icon>shopping_cart</mat-icon>
              {{ 'MAIN_COMPONENTS.sidenav.items.item2' | translate }}
            </a>
          </li>
          <li>
            <a class="menu__item" routerlink="">
              <mat-icon>sell</mat-icon>
              {{ 'MAIN_COMPONENTS.sidenav.items.item3' | translate }}
            </a>
          </li>
          <li>
            <a class="menu__item" routerlink="">
              <mat-icon>history</mat-icon>
              {{ 'MAIN_COMPONENTS.sidenav.items.item4' | translate }}
            </a>
          </li>
          <li>
            <a class="menu__item" routerlink="">
              <mat-icon>favorite</mat-icon>
              {{ 'MAIN_COMPONENTS.sidenav.items.item5' | translate }}
            </a>
          </li>
        </ul>

        <!-- <button (click)="showFiller = !showFiller" mat-raised-button>
          Toggle extra text
        </button> -->
      </mat-drawer>
      <mat-drawer-content>
        <router-outlet />
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

  ngAfterViewInit() {
    // Verify if there is a initial value and apdate the drawer
    this.sidenavSvc.toggleSidenavSignal()
      ? this.drawer.open()
      : this.drawer.close();
  }
}
