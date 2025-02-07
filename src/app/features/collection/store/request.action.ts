import { createAction, props } from "@ngrx/store";
import {Request} from "./request.model";

export const addRequest = createAction(
  '[Request Form] Add Request',
  props<{ request: Request }>()
);

export const addRequestSuccess = createAction(
  '[Request API] Add Request Success',
  props<{ request: Request }>()
)
