import { Store } from '@ngrx/store';
import { UserDomain } from '../../features/auth/domain/userDomain.model';
import { loadAuthData } from '../../features/auth/+state/user.actions';

export function initialStateAuth(store: Store) {
  return () => {
    const userDate = localStorage.getItem('user');
    if (userDate) {
      try {
        const user: UserDomain = JSON.parse(userDate);
        store.dispatch(loadAuthData({ user }));
      } catch (error) {
        console.error('Error parsing User Data', error);
        localStorage.removeItem('user');
      }
    }
  };
}
