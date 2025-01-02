import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../services/courses.service';
import { Course } from '../model/course'; // Adjust the path as necessary
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { CourseResponse } from '../model/course';
@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css'
})
export class CourseDetailsComponent implements OnInit {
  courseId!: number;
  course: Course | null = null;

  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService
  ) {}

  ngOnInit(): void {
    // Get the course ID from the route parameter
    this.courseId = Number(this.route.snapshot.paramMap.get('id'));

    // Fetch the course details
    this.coursesService.getCourseById(this.courseId).subscribe({
      next: (response: CourseResponse) => {
        this.course = response.course;  // Now `course` exists on the response
      },
      error: (err) => {
        console.error('Error fetching course details:', err);
      }
    });
  }
}
