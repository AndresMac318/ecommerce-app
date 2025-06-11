import { BuyDomain } from '../domain/BuyDomain.model';

export interface BuyState {
  buys: BuyDomain[] | [];
  loading: boolean;
  error: string | null;
}
