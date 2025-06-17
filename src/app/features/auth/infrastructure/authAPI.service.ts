import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { catchError, map, Observable, switchMap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { UserDomain } from '../domain/userDomain.model';
import { IAuthAPIService } from './authAPI.interface';
import { AuthAPIResponse } from './models/authResponse.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements IAuthAPIService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly api_url = environment.API_URL_BASE;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  signup(user: UserDomain): Observable<UserDomain> {
    return this.http
      .get<AuthAPIResponse[]>(`${this.api_url}/users?email=${user.email}`)
      .pipe(
        switchMap((users) => {
          if (users.length > 0) {
            return throwError(() => 'UserDomain with this email already exits');
          }
          return this.http.post<AuthAPIResponse>(`${this.api_url}/users`, user);
        }),
        catchError((error) => {
          if (typeof error === 'string') {
            return throwError(() => error);
          }
          return throwError(() => 'Error on Signup, Please try again later');
        })
      );
  }

  login(email: string, password: string): Observable<UserDomain> {
    return this.http
      .get<AuthAPIResponse[]>(`${this.api_url}/users?email=${email}`)
      .pipe(
        map((users) => {
          const user = users[0];
          if (user && user.password === password) {
            return user;
          } else {
            throw new Error('Invalid email or password');
          }
        }),
        catchError((error) => {
          console.error('Error:', error);
          throw new Error('Invalid email or password');
        })
      );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.setItem('appKit_ecommerce/sidenavCollapse', 'false');
    this.router.navigate(['/auth/login']);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }
}
