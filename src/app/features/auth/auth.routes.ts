import { Routes } from '@angular/router';

export const authRoutes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('../../features/auth/ui/pages/login/login.component').then(
        (c) => c.LoginComponent
      ),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('../../features/auth/ui/pages/register/register.component').then(
        (c) => c.RegisterComponent
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import('../../shared/components/not-found/not-found.component').then(
        (c) => c.NotFoundComponent
      ),
  },
];
