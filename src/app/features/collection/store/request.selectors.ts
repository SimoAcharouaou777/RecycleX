import { createFeatureSelector, createSelector } from "@ngrx/store";
import {RequestState} from "./request.reducer";

export const selectRequestState = createFeatureSelector<RequestState>('requests');

export const selectAllRequests = createSelector(
  selectRequestState,
  state => state.requests
);
