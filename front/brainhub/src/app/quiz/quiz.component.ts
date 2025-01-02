import { Component , OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent implements OnInit {
  quiz: any = null;
  selectedAnswers: any = {};

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const courseId = 1; // Replace with actual course ID if dynamic
    this.http.get(`http://localhost:8000/quiz/${courseId}/`).subscribe(
      (response: any) => {
        this.quiz = response;
      },
      (error) => {
        console.error('Error fetching quiz data', error);
      }
    );
  }

}