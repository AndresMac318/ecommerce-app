import { Inject, Injectable } from '@angular/core';
import { HTTP_AUTH_SERVICE } from '../infrastructure/providers/authAPI.provider';
import { IAuthAPIService } from '../infrastructure/authAPI.interface';
import { Observable } from 'rxjs';
import { UserDomain } from '../domain/userDomain.model';

@Injectable({
  providedIn: 'root',
})
export class AuthUseCaseService {
  constructor(
    @Inject(HTTP_AUTH_SERVICE) private authAPIService: IAuthAPIService
  ) {}

  signup(user: UserDomain): Observable<UserDomain> {
    return this.authAPIService.signup(user);
  }

  login(email: string, password: string): Observable<UserDomain> {
    return this.authAPIService.login(email, password);
  }

  logout() {
    return this.authAPIService.logout();
  }

  isLoggedIn() {
    return this.authAPIService.isLoggedIn();
  }
}
