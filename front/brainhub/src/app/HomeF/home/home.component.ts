import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import emailjs from '@emailjs/browser';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']  // Corrected the typo here from styleUrl to styleUrls
})
export class HomeComponent implements OnInit {
  isRecommendationsEmpty: boolean = false; // Default value is false (i.e., not empty)
  isPreferencesEmpty: boolean = false; 
  form!: FormGroup; // Use definite assignment assertion (!) to delay initialization

  constructor(private userService: UserService, private fb: FormBuilder) { }

  ngOnInit(): void {
    // Initialize the form after fb is initialized
    this.form = this.fb.group({
      from_name: '',
      to_name: 'Admin',
      from_email: '',
      subject: '',
      message: '',
    });

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

  async send() {
    emailjs.init('K1FYEZhuoZqabJrf_')
    let response = await emailjs.send("service_oyhd1eo", "template_18hy59n", {
      from_name: this.form.value.from_name,
      to_name: this.form.value.to_name,
      from_email: this.form.value.from_email,
      Subject: this.form.value.subject,
      message: this.form.value.message,
    });
    alert('Message Has been Sent !');
    this.form.reset();
  }
}
