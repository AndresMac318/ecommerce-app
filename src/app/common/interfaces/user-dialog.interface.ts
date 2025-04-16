import { UserDomain } from '../../features/auth/domain/userDomain.model';

export interface UserDialogResult {
  user: UserDomain;
  updated: boolean;
}

export interface UserDialogData {
  user: UserDomain;
  title: string;
}
