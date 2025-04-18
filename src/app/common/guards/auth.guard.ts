import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../../features/auth/infrastructure/authAPI.service';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authSvc = inject(AuthService);

  if (!authSvc.isLoggedIn()) {
    router.navigate(['auth/login']);
    return false;
  }
  return true;
};
