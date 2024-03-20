import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthenticationService } from './core/services/authentication.service';
import { UserService } from './core/services/user.service';
import { of } from 'rxjs';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { NotifcationService } from './core/services/notifcation.service';

export function initializeUserData(
  userService: UserService,
  authService: AuthenticationService,
  notificationService: NotifcationService
) {
  console.log('This Executed');
  if (authService.isLoggedIn()) {
    return () =>
      userService.getBootstrapData().subscribe((res: any) => {
        const currentUser = res.current_user;
        notificationService.listen(currentUser.id);
      });
  } else {
    return () => of(null);
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideRouter(routes),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeUserData,
      deps: [UserService, AuthenticationService, NotifcationService],
      multi: true,
    },
    provideHttpClient(withInterceptors([authInterceptor])),
  ],
};
