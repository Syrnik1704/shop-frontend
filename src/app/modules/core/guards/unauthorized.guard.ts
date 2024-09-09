import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {catchError, map, of, take} from 'rxjs';
import {inject} from "@angular/core";

export const unauthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isLoggedIn().pipe(
    take(1),
    map((resp) => {
      console.log(resp)
      if (resp.message) {
        router.navigate(['/']);
        return false;
      }
      return true;
    }),
    catchError(() => {
      return of(true);
    })
  );
};
