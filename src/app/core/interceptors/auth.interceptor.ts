import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthenticationService);

  if (authService.isLoggedIn()) {
    const authToken = authService.getToken();
    const authReq = req.clone({
      headers: req.headers.set(`Authorization`, `Bearer ${authToken}`),
    });
    return next(authReq);
  }
  return next(req);
};
