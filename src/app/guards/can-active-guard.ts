import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth-service';

export const canActiveGuard: CanActivateFn = (route, state) => {

  const servicioAuth = inject(AuthService);
  const router = inject(Router);

  if (servicioAuth.sesionIniciada()) {
    return true;
  }
  return router.parseUrl('/login');
};
