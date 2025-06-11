import { Routes } from '@angular/router';

export const buysRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./ui/pages/buys/buys.component').then((c) => c.BuysComponent),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./ui/pages/buy-detail/buy-detail.component').then(
        (c) => c.BuyDetailComponent
      ),
  },
];
