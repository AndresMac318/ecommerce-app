import { Routes } from "@angular/router";
import { LoginComponent } from "./pages/login/login.component";
import { RegisterComponent } from "./pages/register/register.component";


export const authRoutes: Routes = [
    { path: 'login',component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'profile', loadComponent: () => import('../../features/auth/pages/profile/profile.component')
        .then(c => c.ProfileComponent)
    },
    { path: '**', loadComponent: () => import('../../shared/components/not-found/not-found.component')
                    .then(c => c.NotFoundComponent)
    }
]