import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { catchError, map } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly TOKEN_KEY = 'auth_token';
  private api_url = environment.API_URL_BASE;

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string){
    return this.http.get<any[]>(`${this.api_url}/users?email=${email}`).pipe(
      map(users => {
        const user = users[0];
        if (user && user.password === password) {
          // const { password, ...userWithoutPassword } = user;
          return user; // Return the user without the password
        } else {
          throw new Error('Invalid email or password');
        }
      }),
      catchError(error => {
        console.error('Error:', error);
        throw new Error('Invalid email or password');
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
    this.router.navigate(['/auth/login']);
  }

}
