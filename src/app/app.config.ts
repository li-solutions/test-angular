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
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { definePreset, palette } from '@primeng/themes';

const primary = palette('#4287f5');

Object.keys(primary).forEach((key) => {
  if (typeof window !== 'undefined') {
    document.documentElement.style.setProperty(
      `--primary-${key}`,
      primary[key]
    );
  }
});

const MyPreset = definePreset(Aura, {
  semantic: {
    colorScheme: {
      primary,
    },
  },
  components: {
    toggleSwitch: {
      // TODO: fix to work
      colorScheme: {
        dark: {
          root: {
            checked: {
              background: primary[950],
            },
          },
        },
      },
    },
  },
});

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
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: MyPreset,
        options: {
          prefix: 'p',
          darkModeSelector: '.my-app-dark',
          cssLayer: false,
        },
      },
      ripple: true,
    }),
  ],
};
