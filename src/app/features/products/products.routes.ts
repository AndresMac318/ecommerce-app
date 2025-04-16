import { Routes } from '@angular/router';

export const productRoutes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full',

    /* loadComponent: () => import('../../features/products/home/home.component')
            .then(c=>c.HomeComponent) */
  },
  {
    path: 'products',
    loadComponent: () =>
      import(
        '../../features/products/ui/pages/products/products.component'
      ).then((c) => c.ProductsComponent),
  },
  {
    path: 'products/:id',
    loadComponent: () =>
      import(
        '../../features/products/ui/pages/product-detail/product-detail.component'
      ).then((c) => c.ProductDetailComponent),
  },
];
