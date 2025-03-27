export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    imageURL: string;
    category: string;
    stock: number;
    sale: false;
    sale_price: number;
}