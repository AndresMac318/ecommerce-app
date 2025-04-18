import { Observable } from 'rxjs';
import { UserDomain } from '../domain/userDomain.model';

export interface IAuthAPIService {
  signup(user: UserDomain): Observable<UserDomain>;
  login(email: string, password: string): Observable<UserDomain>;
  logout(): void;
  isLoggedIn(): boolean;
}
