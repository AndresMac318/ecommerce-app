import { Cart } from '../../../common/interfaces/cart.inteface';

export interface UserDomain {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  password?: string;
  role: 'ADMIN' | 'CUSTOMER';
  address: string;
  cart?: Cart[] | [];
}
