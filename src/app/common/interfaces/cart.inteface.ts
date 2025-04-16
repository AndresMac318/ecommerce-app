export interface Cart {
  id: string;
  idUser: string;
  products: { id: string; quantuty: number }[];
}
