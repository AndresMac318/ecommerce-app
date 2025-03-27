import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideState, provideStore } from '@ngrx/store';
import { userReducer } from './store/user/user.reducer';
import { provideEffects } from '@ngrx/effects';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { httpLoaderFactory } from './core/utils/utils';
import { AuthEffects } from './store/user/user.effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withViewTransitions(), withComponentInputBinding()),
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
    provideStore({ user: userReducer }),
    provideEffects(AuthEffects),
    importProvidersFrom([TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: httpLoaderFactory,
            deps: [HttpClient]
        }
    })]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
]
};
