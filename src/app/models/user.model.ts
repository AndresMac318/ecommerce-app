export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    dateOfBirth: string;
    password: string;
    role: "ADMIN" | "CUSTOMER",
    address: string;
    cart: any[]
}