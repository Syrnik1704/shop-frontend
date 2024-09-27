import { CanActivateFn } from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {AppState} from "../../../store/app.reducer";
import {Store} from "@ngrx/store";
import {of, take} from "rxjs";
import {catchError, map, switchMap} from "rxjs/operators";
import {authUserSelector} from "../../auth/store/auth.selectors";

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const store = inject(Store<AppState>);

  return authService.isLoggedIn().pipe(
    take(1),
    switchMap((resp) => {
      const isLoggedIn = resp.message;
      if (isLoggedIn) {
        return store.select(authUserSelector).pipe(
          map((user) => {
            if (user && user.role === 'ADMIN') {
              return true;
            }
            return false;
          })
        );
      }
      return of(false);
    }),
    catchError((error) => {
      return of(false);
    })
  );
};
