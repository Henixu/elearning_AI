import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  
  cours:any;
  datacour: any[] = []; // Liste pour stocker les cours
skills = ['HTML', 'CSS', 'JavaScript', 'Machine Learning', 'AI'];
constructor(private userService: UserService, private http: HttpClient) {}
user: any;
  ngOnInit() {
    // Fetch user data from localStorage or UserService
    this.user = this.userService.getUser();
    this.cours= this.user?.progress;
    console.log('User:', this.user);
    console.log('learner:', this.user?.learner?.id);
    if (this.user && this.user?.user_id) {
      // Appeler l'API pour récupérer les cours liés à l'utilisateur
      this.listCoursesByUserId(this.user?.user_id);
    }

    
  }
   // Fonction pour récupérer les cours du backend
   listCoursesByUserId(userId: string) {
    const apiUrl = `http://localhost:8000/list-courses-by-user-id/${userId}/`;

    this.http.get(apiUrl).subscribe(
      (response: any) => {
        if (response.courses) {
          this.datacour = response.courses; // Stocker les cours dans la liste datacour
          console.log('Courses fetched:', this.datacour);
        }
      },
      (error) => {
        console.error('Error fetching courses:', error);
      }
    );
  }
  deleteCourse(courseId: string) {
    const learnerId = this.user?.learner?.id;

    if (!learnerId || !courseId) {
        console.error('Invalid learnerId or courseId');
        return;
    }

    console.log('Sending request:', { learner_id: learnerId, course_id: courseId });

    this.http.post('http://localhost:8000/delete_course', { learner_id: learnerId, course_id: courseId })
      .subscribe(
        (response: any) => {
          console.log('Course successfully deleted:', response);
          this.datacour = this.datacour.filter((course: any) => course.id !== courseId);
        },
        (error) => {
          console.error('Error deleting course:', error);
        }
      );
}

}
