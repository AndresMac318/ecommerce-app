import { User } from "../models/user.model";

/**
 * TODO: crear interfaz con estado global(authstate, cartState, etc) 
 * y pasarla al effectAuth en la inyeccion del store
 */

export interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null;
}