import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideStore} from "@ngrx/store";
import {requestReducer} from "./features/collection/store/request.reducer";
import {provideEffects} from "@ngrx/effects";
import {RequestEffects} from "./features/collection/store/request.effects";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore({ requests: requestReducer }),
    provideEffects([RequestEffects])
  ]
};
