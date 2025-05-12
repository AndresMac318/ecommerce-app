export interface UserDomain {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  password?: string;
  role: 'ADMIN' | 'CUSTOMER';
  address: string;
  cart?: CartItem[] | [];
}

export interface CartItem {
  productId: string;
  quantity: number;
  price: number;
  sale_price?: number;
  name: string;
  imageURL: string;
}
