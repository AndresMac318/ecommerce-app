import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        path: 'auth',
        loadChildren: () => import('../app/features/auth/auth.routes').then(m => m.authRoutes)
        //loadComponent: () => import('./features/auth/layout/layout.component').then((c)=>c.LayoutComponent),
        
    },
    //canActivate: [authGuard],
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
