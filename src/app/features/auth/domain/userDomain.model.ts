import { ProductItem } from '../../buys/domain/BuyDomain.model';

export interface UserDomain {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  password?: string;
  role: 'ADMIN' | 'CUSTOMER';
  address: string;
  cart?: ProductItem[] | [];
}