import { Observable } from 'rxjs';
import { BuyDomain } from '../domain/BuyDomain.model';

export interface IBuyAPIService {
  getBuysByClient(idClient: string): Observable<BuyDomain[]>;
  getBuyById(id: string): Observable<BuyDomain>;
  registerBuy(buyData: BuyDomain): Observable<BuyDomain>;
}
