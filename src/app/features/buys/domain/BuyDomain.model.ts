export interface BuyDomain {
  id?: string;
  idUser: string;
  salesProducts: ProductItem[];
  VAT19: number;
  subtotalSale: number;
  amountSale: number;
  paidType: 'CASH' | 'TRANSFER';
  dateSale: string;
  state: 'PENDING' | 'SUCCESS' | 'ERROR';
}

export interface ProductItem {
  id: string;
  price: number;
  name: string;
  imageURL: string;
  quantity: number;
  sale: boolean;
  sale_price: number;
}
