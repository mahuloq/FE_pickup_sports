import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { noAuthGuard } from './core/guards/no-auth.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./features/timeline/timeline.component').then(
        (c) => c.TimelineComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'events',
    loadComponent: () =>
      import('./features/events/events.component').then(
        (c) => c.EventsComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'create-event',
    loadComponent: () =>
      import('./features/create-event/create-event.component').then(
        (c) => c.CreateEventComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'events/:id',
    loadComponent: () =>
      import('./features/event-details/event-details.component').then(
        (c) => c.EventDetailsComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.component').then(
        (c) => c.LoginComponent
      ),
    canActivate: [noAuthGuard],
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./features/auth/signup/signup.component').then(
        (c) => c.SignupComponent
      ),
    canActivate: [noAuthGuard],
  },
];
