import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent {
  constructor(private userService: UserService, private http: HttpClient) { }

  selectedOptions: string[] = [];

  addToList(option: string): void {
    if (!this.selectedOptions.includes(option)) {
      this.selectedOptions.push(option);
      console.log(this.selectedOptions);
    }
  }

  add(): void {
    const user = this.userService.getUser();

    if (user) {
      const updatedPreferences = [...user.learner.preferences, ...this.selectedOptions];

      // Get the token from localStorage (or other storage method)
      const token = localStorage.getItem('auth_token');

      // If token exists, add it to the request headers
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

      // Update preferences via HTTP request to backend
      this.http.put(`http://localhost:8000/learner/update-preferences/`, {
        preferences: updatedPreferences
      }, { headers }).subscribe(
        (response) => {
          console.log('Preferences updated successfully', response);
          user.learner.preferences = updatedPreferences;
          this.userService.setUser(user);
        },
        (error) => {
          console.error('Error updating preferences', error);
        }
      );
    }
  }
}