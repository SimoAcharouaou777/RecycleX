import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as RequestActions from "./request.action";
import { map } from "rxjs/operators";

@Injectable()
export class RequestEffects {
  addRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RequestActions.addRequest),
      map(action => {
        return RequestActions.addRequestSuccess({ request: action.request });
      })
    )
  );

  constructor(private actions$: Actions) { }
}
