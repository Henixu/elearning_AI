import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../services/courses.service';
import { Course } from '../model/course'; // Adjust the path as necessary
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';  // Import DomSanitizer
import { Router } from '@angular/router';
@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
  courseId!: number;
  course: Course | null = null;

  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService,
    private sanitizer: DomSanitizer // Inject DomSanitizer here,
    ,private router: Router
  ) {}

  ngOnInit(): void {
    // Get the course ID from the route parameter
    this.courseId = Number(this.route.snapshot.paramMap.get('id'));

    // Fetch the course details
    this.coursesService.getCourseById(this.courseId).subscribe({
      next: (response) => {
        this.course = response.course;  // Assuming response contains the course data
      },
      error: (err) => {
        console.error('Error fetching course details:', err);
      }
    });
  }

  // Method to sanitize video URL for iframe embedding
  getSanitizedVideoUrl(videoUrl: string): SafeResourceUrl {
    // If the URL is a YouTube link, format it for iframe embedding
    const youtubeUrlPattern = /https:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/;
    const match = videoUrl.match(youtubeUrlPattern);
    
    if (match) {
      const youtubeVideoId = match[1];
      const youtubeEmbedUrl = `https://www.youtube.com/embed/${youtubeVideoId}`;
      return this.sanitizer.bypassSecurityTrustResourceUrl(youtubeEmbedUrl);
    }
    
    // Add more conditions for other platforms like Vimeo, etc. if necessary
    
    // Return the URL as-is for now if it's not a YouTube URL (not recommended without sanitization)
    return this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  }
  // Method to navigate to the quiz component
navigateToQuiz(courseId: number): void {
  this.router.navigate(['/quiz', courseId]);
}
}
