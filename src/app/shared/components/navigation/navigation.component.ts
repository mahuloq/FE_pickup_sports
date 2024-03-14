import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { User } from '../../models/user';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent implements OnInit {
  isSidebarVisible: boolean = false;
  currentUser: User | null = null;
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.currentUserbehaviorSubject.subscribe((user) => {
      this.currentUser = user;
    });
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  logout() {
    if (this.isSidebarVisible) {
      this.toggleSidebar();
    }
    this.authService.logout();
    this.userService.setCurrentUser(null);
  }
  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }
}
