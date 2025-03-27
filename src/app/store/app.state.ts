import { User } from "../core/interfaces/user.model";

/**
 * TODO: crear interfaz con estado global(authstate, cartState, etc) 
 * y pasarla al effectAuth en la inyeccion del store
 */

export interface UserState {
    user: User | null;
    loading: boolean;
    error: string | null;
}