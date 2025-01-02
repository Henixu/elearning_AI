import { Component } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { Course } from '../../model/course'; // Adjust the path as necessary
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cours-list',
  templateUrl: './cours-list.component.html',
  styleUrls: ['./cours-list.component.css']
})
export class CoursListComponent {
  cours: Course[] = []; // All courses
  filteredCours: Course[] = []; // Filtered courses
  searchQuery: string = ''; // Search query
  
  constructor(private coursesService: CoursesService,private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.coursesService.getCourses().subscribe({
      next: (response) => {
        this.cours = response.courses; // Populate courses
        this.filteredCours = this.cours; // Initially, no filter
        console.log('Courses:', this.cours);
      },
      error: (err) => {
        console.error('Error fetching courses:', err);
      }
    });
  }

  // Filter the courses based on the search query
  filterCourses(): void {
    if (!this.searchQuery) {
      this.filteredCours = this.cours; // Show all courses if search is empty
    } else {
      this.filteredCours = this.cours.filter(course =>
        course.titre.toLowerCase().includes(this.searchQuery.toLowerCase()) // Case-insensitive search
      );
    }
  }
  addCourseToLearner(courseId: number): void {
    const user = this.userService.getUser();
    console.log('User from UserService:', user); // Log the user to debug
    
    if (user && user.learner && user.learner.id) {
      const learnerId = user.learner.id;
      console.log('Learner ID:', learnerId);
  
      this.coursesService.addCourseToLearner(learnerId, courseId).subscribe({
        next: (response) => {
          alert('Course successfully added to learner!');
        },
        error: (err) => {
          console.error('Error adding course:', err);
          alert(err.error.message || 'Failed to add course.');
        }
      });
    } else {
      console.error('Learner ID is undefined or user structure is incorrect.');
      alert('Unable to retrieve learner ID. Please check your user data.');
    }
  }
  viewCourseDetails(courseId: number): void {
    this.router.navigate(['/course-details', courseId]);  // Navigate to the course details page
  }
  
  
}
