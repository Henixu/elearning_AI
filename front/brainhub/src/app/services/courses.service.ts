import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CourseResponse } from"../model/course";
@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private apiUrl = 'http://localhost:8000/courses'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  getCourses(): Observable<CourseResponse> {
    return this.http.get<CourseResponse>(this.apiUrl);
  }
}
