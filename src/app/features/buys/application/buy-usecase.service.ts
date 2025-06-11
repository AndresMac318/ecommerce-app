import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BuyDomain } from '../domain/BuyDomain.model';
import { HTTP_BUY_SERVICE } from '../infrastructure/providers/buyAPI.provider';
import { IBuyAPIService } from '../infrastructure/buysAPI.interface';

@Injectable({
  providedIn: 'root',
})
export class BuyUsecaseService {
  constructor(
    @Inject(HTTP_BUY_SERVICE) private buysAPIService: IBuyAPIService
  ) {}

  getBuysByClient(idClient: string): Observable<BuyDomain[]> {
    return this.buysAPIService.getBuysByClient(idClient);
  }

  getBuyById(id: string): Observable<BuyDomain> {
    return this.buysAPIService.getBuyById(id);
  }

  registerBuy(buyData: BuyDomain): Observable<BuyDomain> {
    return this.buysAPIService.registerBuy(buyData);
  }
}
