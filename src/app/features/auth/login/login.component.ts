import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { Router } from '@angular/router';
import { NotifcationService } from '../../../core/services/notifcation.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: '../auth.shared.scss',
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  isError: boolean = false;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private notificationService: NotifcationService
  ) {}

  login() {
    if (this.loginForm.valid) {
      const username = this.loginForm.value.username;
      const password = this.loginForm.value.password;
      this.authService.login(username, password).subscribe({
        next: (res: any) => {
          this.notificationService.listen(res.current_user.id);
          this.router.navigate(['/']);
        },
        error: (error: any) => {
          console.log('Error when logging', error);
          this.isError = true;
        },
      });
    }
  }
}
