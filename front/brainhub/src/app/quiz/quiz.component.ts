import { Component , OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { CoursesService } from '../services/courses.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'; 
import { Router } from '@angular/router';
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent implements OnInit {
  quiz: any = null;
  selectedAnswers: any = {};
  message: string = '';
  learnerId: number | null = null;
  courseId: number | null = null; 
  responseData: any = null;
  constructor(private http: HttpClient,private userService: UserService,private sanitizer: DomSanitizer,
    private router: Router) {}

  ngOnInit(): void {
    const storedCourseId = localStorage.getItem('courseId')?.valueOf();
    //recuperer courseid from local storage 

    const courseId = storedCourseId ? Number(storedCourseId) : null;
    console.log(" course id :==== ",courseId) // Replace with actual course ID if dynamic
    this.http.get(`http://localhost:8000/quiz/${courseId}/`).subscribe(
      (response: any) => {
        this.quiz = response;
        console.log('Quiz data:', this.quiz);
      },
      (error) => {
        console.error('Error fetching quiz data', error);
      }
    );
  }
  // Fonction pour soumettre les réponses
  // onSubmit(): void {
    
  //   const user = this.userService.getUser();
  //   this.learnerId= user.learner.id// Replace with actual learner ID
  //   if (!this.learnerId) {
  //     console.error('Learner ID is missing.');
  //     return;
  //   }
    
    
  //   const storedCourseId = localStorage.getItem('courseId')?.valueOf();
  //   //recuperer courseid from local storage 

  //   const courseId = storedCourseId ? Number(storedCourseId) : null;
  //   const data = {
  //     learnerId: this.learnerId,
  //     selectedAnswers: this.selectedAnswers
  //   };

  //   this.http.post(`http://localhost:8000/submit-quiz/${courseId}/`, data).subscribe(
      
  //     (response: any) => {
        
  //       console.log('Quiz submitted successfully', response);
  //     },
  //     (error) => {
  //       console.error('Error submitting quiz', error);

  //     }
  //   );
  // }
  onSubmit(): void {
    const user = this.userService.getUser();
    this.learnerId = user.learner.id;
  
    if (!this.learnerId) {
      console.error('Learner ID is missing.');
      return;
    }
  
    const storedCourseId = localStorage.getItem('courseId')?.valueOf();
    const courseId = storedCourseId ? Number(storedCourseId) : null;
  
    const data = {
      learnerId: this.learnerId,
      selectedAnswers: this.selectedAnswers,
    };
  
    this.http.post(`http://localhost:8000/submit-quiz/${courseId}/`, data).subscribe(
      (response: any) => {
        console.log('Quiz submitted successfully', response);
  
        // Save response data to display in the modal
        this.responseData = response;
        this.message = response.message;
  
        // Open the dialog
        const dialog: HTMLDialogElement | null = document.querySelector('#responseDialog');
        if (dialog) {
          dialog.showModal();
        }
      },
      (error) => {
        console.error('Error submitting quiz', error);
      }
    );
  }
  
  closeDialog(): void {
    const dialog: HTMLDialogElement | null = document.querySelector('#responseDialog');
    if (dialog) {
      dialog.close();
    }
  }
}