import { CanMatchFn, Route, Router, UrlSegment } from '@angular/router';
import { AuthService } from '../service/auth-service';
import { inject } from '@angular/core';

export const canMatchGuard: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.rolActual() === 'ROLE_ADMIN') {
    return true;
  }
  router.navigate(['/dashboard']); 
  return false;
};
