import { Component } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { Course } from '../../model/course'; // Adjust the path as necessary

@Component({
  selector: 'app-cours-list',
  templateUrl: './cours-list.component.html',
  styleUrls: ['./cours-list.component.css']
})
export class CoursListComponent {
  cours: Course[] = []; // All courses
  filteredCours: Course[] = []; // Filtered courses
  searchQuery: string = ''; // Search query

  constructor(private coursesService: CoursesService) {}

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
}
