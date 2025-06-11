import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
  isDevMode,
  LOCALE_ID,
  APP_INITIALIZER,
} from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withViewTransitions,
} from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore, Store } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { httpLoaderFactory } from './common/utils/utils';
import { AuthEffects } from './features/auth/+state/user.effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { PRODUCT_API_PROVIDER } from './features/products/infrastructure/providers/productAPI.provider';
import { productReducer } from './features/products/+state/product.reducers';
import { ProductEffects } from './features/products/+state/products.effects';

import { registerLocaleData } from '@angular/common';
import localeEsCo from '@angular/common/locales/es-CO';
import { AUTH_API_PROVIDER } from './features/auth/infrastructure/providers/authAPI.provider';
import { userReducer } from './features/auth/+state/user.reducer';
import { initialStateAuth } from './common/utils/initializeAuth';
import { BUY_API_PROVIDER } from './features/buys/infrastructure/providers/buyAPI.provider';
import { buyReducer } from './features/buys/+state/buy.reducers';
import { BuyEffect } from './features/buys/+state/buy.effects';

registerLocaleData(localeEsCo);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withViewTransitions(), withComponentInputBinding()),
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
    provideStore({
      user: userReducer,
      product: productReducer,
      buy: buyReducer,
    }),
    provideEffects([AuthEffects, ProductEffects, BuyEffect]),
    importProvidersFrom([
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: httpLoaderFactory,
          deps: [HttpClient],
        },
      }),
    ]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    //custom providers
    PRODUCT_API_PROVIDER,
    BUY_API_PROVIDER,
    AUTH_API_PROVIDER,
    { provide: LOCALE_ID, useValue: 'es-CO' },
    {
      provide: APP_INITIALIZER,
      useFactory: initialStateAuth,
      deps: [Store],
      multi: true,
    },
    //provideAppInitializer(() => {initialStateAuth})
  ],
};
