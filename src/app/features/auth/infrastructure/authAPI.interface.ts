import { UserDomain } from '../domain/userDomain.model';

export interface IAuthAPIService {
  signup(user: UserDomain): any;
  login(email: string, password: string): any;
  logout(): void;
  isLoggedIn(): boolean;
}
