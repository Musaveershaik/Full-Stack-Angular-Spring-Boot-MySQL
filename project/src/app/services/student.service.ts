import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private readonly API_URL = 'http://localhost:8084';
  private readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };

  constructor(private http: HttpClient) {}

  /**
   * Get all students from the backend
   */
  getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.API_URL}/students`)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  /**
   * Get a single student by ID
   */
  getStudentById(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.API_URL}/students/${id}`)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  /**
   * Create a new student
   */
  createStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(`${this.API_URL}/students`, student, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Update an existing student
   */
  updateStudent(id: number, student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.API_URL}/students/${id}`, student, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Delete a student by ID
   */
  deleteStudent(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/students/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Test backend connection
   */
  testConnection(): Observable<string> {
    return this.http.get(`${this.API_URL}/`, { responseType: 'text' })
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Handle HTTP errors
   */
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Client Error: ${error.error.message}`;
    } else {
      // Server-side error
      switch (error.status) {
        case 0:
          errorMessage = 'Cannot connect to server. Please ensure the Spring Boot backend is running on port 8080.';
          break;
        case 404:
          errorMessage = 'Resource not found.';
          break;
        case 400:
          errorMessage = 'Bad request. Please check your input.';
          break;
        case 500:
          errorMessage = 'Internal server error. Please try again later.';
          break;
        default:
          errorMessage = `Server Error: ${error.status} - ${error.message}`;
      }
    }
    
    console.error('API Error:', error);
    return throwError(() => errorMessage);
  }
}