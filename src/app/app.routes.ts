import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [

    {
        path: '',
        loadComponent: () => import('../app/shared/components/layout/layout.component')
            .then(c => c.LayoutComponent),
        loadChildren: () => import('../app/features/products/products.routes')
            .then(m => m.productRoutes),
        // canActivate: [ authGuard ]
    },
    {
        path: 'auth',
        loadChildren: () => import('../app/features/auth/auth.routes').then(m => m.authRoutes),
        loadComponent: () => import('./features/auth/layout/layout.component').then((c)=>c.LayoutComponent),
        
    },    
    {
        path: '**',
        loadComponent: () => import('../app/shared/components/not-found/not-found.component').then(c => c.NotFoundComponent) 
    }

    /*
        {
            path: '', redirectTo: 'auth/sign-in', pathMatch: 'full'
        },
        {
            path: 'auth',
            loadComponent: () => import('./modules/auth/layout/layout.component').then((x) => x.LayoutComponent),
            loadChildren: () => import('./modules/modules.routes').then((x) => x.modulesRoutes)
        },
        {
            path: 'pages'
        }
    */
];
