import { inject, Injectable } from '@angular/core';
import { IBuyAPIService } from './buysAPI.interface';
import { Observable } from 'rxjs';
import { BuyDomain } from '../domain/BuyDomain.model';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BuysAPIService implements IBuyAPIService {
  private http = inject(HttpClient);
  private readonly api_url = environment.API_URL_BASE;

  getBuysByClient(idClient: string): Observable<BuyDomain[]> {
    return this.http.get<BuyDomain[]>(
      `${this.api_url}/sales?idUser=${idClient}`
    );
  }

  getBuyById(id: string): Observable<BuyDomain> {
    return this.http.get<BuyDomain>(`${this.api_url}/sales/${id}`);
  }

  registerBuy(buyData: BuyDomain): Observable<BuyDomain> {
    return this.http.post<BuyDomain>(`${this.api_url}/sales`, buyData);
  }
}
