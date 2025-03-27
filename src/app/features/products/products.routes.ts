import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";

export const productRoutes: Routes = [
    {
        path: '',
        component: HomeComponent,
        
        /* loadComponent: () => import('../../features/products/home/home.component')
            .then(c=>c.HomeComponent) */
    },
    {
        path: 'products',
        loadComponent: () => import('../../features/products/pages/products/products.component')
            .then(c => c.ProductsComponent) 
    },
    {
        path: 'products/:id',
        loadComponent: () => import('../../features/products/pages/product-detail/product-detail.component')
            .then(c => c.ProductDetailComponent)
    }
]