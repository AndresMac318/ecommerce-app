import { InjectionToken, Provider } from '@angular/core';
import { IAuthAPIService } from '../authAPI.interface';
import { AuthService } from '../authAPI.service';

export const HTTP_AUTH_SERVICE = new InjectionToken<IAuthAPIService>(
  'AuthService'
);

export const AUTH_API_PROVIDER: Provider = {
  provide: HTTP_AUTH_SERVICE,
  useClass: AuthService,
};
