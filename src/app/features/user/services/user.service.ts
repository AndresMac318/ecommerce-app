import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { UserDomain } from '../../auth/domain/userDomain.model';
import { AuthAPIResponse } from '../../auth/infrastructure/models/authResponse.model';
import { ProductItem } from '../../buys/domain/BuyDomain.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private api_url = environment.API_URL_BASE;

  constructor(private http: HttpClient) {}

  getCurrentUser(): Observable<UserDomain> {
    const userId = localStorage.getItem('userId');
    if (userId) {
      return this.http.get<UserDomain>(`${this.api_url}/users/${userId}`);
    } else {
      throw new Error('UserDomain is not logged!');
    }
  }

  updateProfile(userId: string, userData: UserDomain): Observable<UserDomain> {
    return this.http
      .get<AuthAPIResponse[]>(`${this.api_url}/users?email=${userData.email}`)
      .pipe(
        switchMap((users) => {
          const existsUser = users.find((user) => user.id !== userId);
          if (existsUser) {
            return throwError(() => 'Email already exists');
          }
          return this.http.put<AuthAPIResponse>(
            `${this.api_url}/users/${userId}`,
            userData
          );
        }),
        catchError((error) => {
          console.error('Error', error.message);
          return throwError(() => error);
        })
      );
  }

  getCart(userId: string): Observable<ProductItem[]> {
    return this.http.get<ProductItem[]>(`${this.api_url}/users/${userId}/cart`);
  }

  updateCart(userId: string, cart: ProductItem[]): Observable<void> {
    return this.http.patch<void>(`${this.api_url}/users/${userId}`, { cart });
  }
}
