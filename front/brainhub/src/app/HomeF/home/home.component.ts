import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']  // Corrected the typo here from styleUrl to styleUrls
})
export class HomeComponent implements OnInit {
  isRecommendationsEmpty: boolean = false; // Default value is false (i.e., not empty)
  isPreferencesEmpty: boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    const user = this.userService.getUser();

    // Check if 'user' and 'user.recommendations' are defined and not empty
    if (user && user.recommendations && user.recommendations.length > 0) {
      this.isRecommendationsEmpty = false;
    } else {
      this.isRecommendationsEmpty = true;
    }

    // Check if 'user' and 'user.learner.preferences' are defined and preferences are empty
    const preferences = user?.learner?.preferences || [];  // Using optional chaining to safely access preferences
    this.isPreferencesEmpty = preferences.length === 0;

    console.log('preferences list', preferences, 'is preferences empty=', this.isPreferencesEmpty, 'length', preferences.length);
  }
}
