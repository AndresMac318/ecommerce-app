import { UserDomain } from '../domain/userDomain.model';

export interface UserState {
  user: UserDomain | null;
  loading: boolean;
  error: string | null;
}
