import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CourseResponse } from"../model/course";
import { Course } from '../model/course'; // Adjust the path as necessary
@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private apiUrl = 'http://localhost:8000/courses'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  getCourses(): Observable<CourseResponse> {
    return this.http.get<CourseResponse>(this.apiUrl);
  }
  addCourseToLearner(learnerId: number, courseId: number): Observable<any> {
    const payload = { learner_id: learnerId, course_id: courseId };
    return this.http.post('http://127.0.0.1:8000/add_course', payload);
  }
  getCourseById(courseId: number): Observable<CourseResponse> {
    return this.http.get<CourseResponse>(`http://localhost:8000/api/course/${courseId}/`);
  }
}
