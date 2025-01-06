import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';
  showNotification: boolean = false; // To toggle the notification visibility

  constructor(private authService: AuthService, private router: Router, private userService: UserService) {}

  onSubmit() {
    this.isLoading = true;
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        this.isLoading = false;
        console.log('Login successful:', response);
        this.userService.setUser(response);
        this.router.navigate(['/home']);
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = error.error?.error || 'An unexpected error occurred.';
        this.showNotification = true; // Show the notification

        // Automatically hide the notification after 3 seconds
        setTimeout(() => {
          this.showNotification = false;
        }, 3000);
      }
    );
  }
}
