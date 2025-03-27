import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card'
import { RouterLink, RouterModule } from '@angular/router';


@Component({
  selector: 'app-not-found',
  imports: [ MatCardModule, MatButtonModule, RouterModule, RouterLink ],
  template: `
    <mat-card class="not-found-card">
      <h1 class="error-code">404</h1>
      <p class="error-message">Página no encontrada</p>
      <button mat-raised-button color="primary" routerLink="/auth/login">Volver al Inicio</button>
    </mat-card>
  `,
  styleUrl: './not-found.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent { }
