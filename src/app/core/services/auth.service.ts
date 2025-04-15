import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, finalize, tap, throwError } from 'rxjs';


const API_URL = `https://api.trenda.live/api/v1/auth`;
 

@Injectable({
  providedIn: 'root',
})
export class AuthService {


  private http = inject(HttpClient);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public  loading$ = this.loadingSubject.asObservable();

  /**
   * 
   * @param email 
   * @param password 
   * @returns 
   */
  login(email: string, password: string): Observable<any> {
    const user = { email, password };
    this.loadingSubject.next(true);
    
    return this.http.post<any>(`${API_URL}/login`, user).pipe(
      tap(response => {
        if (response) {
          localStorage.setItem('token', response.token);
        }
      }),
      catchError(error => {
        return throwError(() => new Error('Login failed: ' + error.message || error));
      }),
      finalize(() => this.loadingSubject.next(false))
    );
  }
  

  /**
   * 
   * @param user 
   * @returns 
   */
  signup(user: any): Observable<any> {
    this.loadingSubject.next(true);
    return this.http.post(`${API_URL}/register`, user).pipe(
      finalize(() => this.loadingSubject.next(false))
    );
  }



  getProfile(): Observable<any> {
    
    this.loadingSubject.next(true);
    return this.http.get(`${API_URL}/me`).pipe(
      finalize(() => this.loadingSubject.next(false))
    );
  }

  /**
   * Logout user
   */
  logout() {
    localStorage.removeItem('token');
  }


  /**
   * 
   * @returns 
   */
  getCurrentUser(){
    return JSON.parse(localStorage.getItem('token') || '');
  }

}
