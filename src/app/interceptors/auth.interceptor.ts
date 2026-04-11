import { HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const email = localStorage.getItem('email');
  const sesion = localStorage.getItem('sesion');

  if (email && sesion === 'true' && req.url.includes('localhost:8080')) {
    const encoded = btoa(`${email}:`);
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Basic ${encoded}`
      }
    });
    return next(authReq);
  }

  return next(req);
};
