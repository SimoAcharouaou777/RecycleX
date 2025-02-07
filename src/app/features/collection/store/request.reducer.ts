import { createReducer, on } from "@ngrx/store";
import { Request } from "./request.model";
import * as RequestActions from "./request.action";
import {state} from "@angular/animations";

export interface RequestState {
  requests: Request[];
}

export const initialState: RequestState = {
  requests: []
};

export const requestReducer = createReducer(
  initialState,
  on(RequestActions.addRequestSuccess, (state, { request }) => ({
    ...state,
    request: [...state.requests, request]
  }))
);
