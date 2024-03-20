import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { UserService } from './user.service';
import { NotifcationService } from './notifcation.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService,
    private notificationService: NotifcationService
  ) {}

  login(username: string, password: string) {
    return this.http
      .post<{ token: string }>(`${environment.apiURL}/login`, {
        username,
        password,
      })
      .pipe(
        switchMap((res: any) => {
          this.setToken(res.token);
          return this.userService.getBootstrapData();
        })
      );
  }

  signUp(data: any) {
    return this.http.post(`${environment.apiURL}/users`, data);
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return !!this.getToken();
  }

  logout() {
    const currentUser = this.userService.currentUserbehaviorSubject.value;
    //unsubscribe from pusher channel
    if (currentUser) {
      this.notificationService.unsubscribeChannel(currentUser.id);
    }
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
