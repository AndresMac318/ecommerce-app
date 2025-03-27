import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment.development';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';
import { User } from '../../../core/interfaces/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private api_url = environment.API_URL_BASE;

  constructor(private http: HttpClient, private router: Router) { }

  signup(userData: any){
    return this.http.get<any[]>(`${this.api_url}/users?email=${userData.email}`).pipe(
      switchMap(users => {
        if (users.length > 0) {
          return throwError(() => 'User with this email already exits');
        }
        return this.http.post<any>(`${this.api_url}/users`, userData);
      }),
      catchError(error => {
        if (typeof error === 'string') {
          return throwError(() => error);
        }
        return throwError(() => 'Error on Signup, Please try again later');
      })
    )
  }

  getCurrentUser(): Observable<any> {
    const userId = localStorage.getItem('userId');
    if (userId) {
      return this.http.get(`${this.api_url}/users/${userId}`);
    }
    else {
      return of(new Error('User not authenticated!'));
    }
  }

  updateProfile(userId: string, user: User): Observable<any>{
    return this.http.get<any[]>(`${this.api_url}/users?email=${user.email}`).pipe(
      switchMap((users) => {
        const existsUser = users.find(user => user.id !== userId);
        if (existsUser) {
          return throwError(() => 'Email already exists');
        }
        return this.http.put(`${this.api_url}/users/${userId}`, user);
      }),
      catchError(error => {
        console.error('Error', error);
        return throwError(() => error);
      })
    );
  }

}
