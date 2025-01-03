import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent {
  selectedOptions: string[] = [];

  constructor(private userService: UserService, private http: HttpClient) { }

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

      // Send learnerId and preferences in the request body
      this.http.put('http://localhost:8000/learner/update-preferences/', {
        learnerId: user.learner.id, // Include learner ID from local storage
        preferences: updatedPreferences
      }).subscribe(
        (response) => {
          console.log('Preferences updated successfully', response);
          user.learner.preferences = updatedPreferences;
          this.userService.setUser(user);

          // Refresh the page after updating preferences
          window.location.reload(); // Use window.location.reload to refresh the page
        },
        (error) => {
          console.error('Error updating preferences', error);
        }
      );
    }
  }
}
