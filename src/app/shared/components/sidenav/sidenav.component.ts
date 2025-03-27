import { AfterViewInit, ChangeDetectionStrategy, Component, effect, inject, OnInit, ViewChild } from '@angular/core';

import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { SidenavService } from '../../../core/services/sidenav.service';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatButtonModule,
    RouterOutlet,
    MatIconModule,
    MatMenuModule
  ],
  template: `
    <mat-drawer-container class="container" autosize>
      
      <mat-drawer #drawer class="example-sidenav" mode="side">
        <ul>
          <li>
            <mat-icon>local_mall</mat-icon>
            <a routerlink="">Products</a>
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
            <mat-icon>shopping_cart</mat-icon>
            <a routerlink="">Buys</a>
          </li>
          <li>
            <mat-icon>sell</mat-icon>
            <a routerlink="">Offers</a>
          </li>
          <li>
            <mat-icon>history</mat-icon>
            <a routerlink="">History</a>
          </li>
          <li>
            <mat-icon>favorite</mat-icon>
            <a routerlink="">Favorites</a>
          </li>
        </ul>
        
        <!-- <button (click)="showFiller = !showFiller" mat-raised-button>
          Toggle extra text
        </button> -->
      </mat-drawer>

      <!-- <div class="sidenav-content">
        <h3>content</h3>
        <router-outlet></router-outlet>
      </div> -->
      <mat-drawer-content>
      <router-outlet/>
      </mat-drawer-content>

    </mat-drawer-container>
  `,
  styleUrl: './sidenav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavComponent implements OnInit, AfterViewInit {

  @ViewChild('drawer') drawer!: MatDrawer;
  showFiller = false;
  

  private sidenavSvc = inject(SidenavService);

  constructor(){
    effect(() => {
      this.sidenavSvc.toggleSidenavSignal();
      this.toggle();
    }) 
  }

  ngOnInit(): void {} 

  toggle(){
    if (this.drawer) {
      this.drawer.toggle();
    }
  }

  ngAfterViewInit() {
    // Verificamos si hay un valor inicial y actualizamos el drawer
    (this.sidenavSvc.toggleSidenavSignal()) ? this.drawer.open : this.drawer.close(); 
  }


}
