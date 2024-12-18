import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    provideFirebaseApp(() =>
      initializeApp({
        apiKey: environment.firebaseApiKey,
        authDomain: environment.firebaseAuthDomain,
        projectId: environment.firebaseProjectId,
        storageBucket: environment.firebaseStorageBucket,
        messagingSenderId: environment.firebaseMessagingSenderId,
        appId: environment.firebaseAppId,
      })
    ),
    provideAuth(() => getAuth()),
  ],
};
