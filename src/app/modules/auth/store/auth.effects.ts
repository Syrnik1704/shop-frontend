import {Injectable, inject} from "@angular/core";
import * as AuthActions from "./auth.actions";
import {AuthService} from "../../core/services/auth.service";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, map, switchMap} from "rxjs/operators";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {of} from "rxjs";

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private toastr = inject(ToastrService);

  login$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.login),
    switchMap((action) => {
      return this.authService.login(action.loginData).pipe(
        map((user) => {
          this.toastr.success('You logged in!', 'Success');
          return AuthActions.loginSuccess({userData: {...user}})
        }),
        catchError(err => {
          console.log(err);
          return of(AuthActions.loginFailure({error: err}))
        })
      );
    })
  ))

  register$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.register),
    switchMap((action) => {
      return this.authService.register(action.registerData).pipe(
        map((user) => {
          this.router.navigate(["/login"]);
          this.toastr.success('Your account has beed created!\n We send email with link to activate Your account', 'Success')
          return AuthActions.registerSuccess()
        }),
        catchError(err => {
          console.log(err);
          return of(AuthActions.registerFailure({error: err}));
        })
      );
    })
  ))

  constructor(private authService: AuthService, private router: Router) {}
}
