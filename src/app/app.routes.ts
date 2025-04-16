import { Routes } from '@angular/router';
//import { authGuard } from './common/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../app/shared/components/layout/layout.component').then(
        (c) => c.LayoutComponent
      ),
    loadChildren: () =>
      import('../app/features/products/products.routes').then(
        (m) => m.productRoutes
      ),
    //canActivate: [authGuard],
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('../app/features/auth/auth.routes').then((m) => m.authRoutes),
    loadComponent: () =>
      import('./features/auth/ui/layout/layout.component').then(
        (c) => c.LayoutComponent
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import('../app/shared/components/not-found/not-found.component').then(
        (c) => c.NotFoundComponent
      ),
  },
];
