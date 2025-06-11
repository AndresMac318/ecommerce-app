import { InjectionToken, Provider } from '@angular/core';
import { IBuyAPIService } from '../buysAPI.interface';
import { BuysAPIService } from '../buysAPI.service';

export const HTTP_BUY_SERVICE = new InjectionToken<IBuyAPIService>(
  'BuysAPIService'
);

export const BUY_API_PROVIDER: Provider = {
  provide: HTTP_BUY_SERVICE,
  useClass: BuysAPIService,
};
