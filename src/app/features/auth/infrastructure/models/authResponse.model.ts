export interface AuthAPIResponse {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  address: string;
  password: string;
  role: 'ADMIN' | 'CUSTOMER';
  cart: [];
}
