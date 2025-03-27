export interface User {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    dateOfBirth: string;
    password: string;
    role: "ADMIN" | "CUSTOMER";
    address: string;
    cart: any[];
}