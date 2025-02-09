import { createReducer, on } from "@ngrx/store";
import { Request } from "./request.model";
import * as RequestActions from "./request.action";
import {state} from "@angular/animations";

export interface RequestState {
  requests: Request[];
  loading: boolean;
  error: string | null ;
}

export const initialState: RequestState = {
  requests: [],
  loading: false,
  error: null
};

export const requestReducer = createReducer(
  initialState,
  on(RequestActions.addRequestSuccess, (state, { request }) => ({
    ...state,
    request: [...state.requests, request]
  }))
);
