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

  constructor(private authService: AuthService, private router: Router) {}

  login$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.login),
    switchMap((action) => {
      return this.authService.login(action.loginData).pipe(
        map((user) => {
          this.router.navigate(["/"]);
          this.toastr.success(`You logged in! Hi ${user.login}!`, 'Success');
          return AuthActions.loginSuccess({userData: {...user}})
        }),
        catchError(err => {
          this.toastr.error(`Error occurred while logging in: ${err}`, 'ERROR');
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
          this.toastr.success('Your account has beed created!     We send email with link to activate Your account', 'Success')
          return AuthActions.registerSuccess()
        }),
        catchError(err => {
          this.toastr.error(`Error occurred while registration: ${err}`, 'ERROR');
          return of(AuthActions.registerFailure({error: err}));
        })
      );
    })
  ))

  logout$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.logout),
    switchMap((action) => {
      return this.authService.logout().pipe(
        map(() => {
          this.router.navigate(["/login"]);
          this.toastr.success(`You logged out! Goodbye!`, 'Success');
          return AuthActions.logoutSuccess()
        }),
        catchError(err => {
          this.toastr.error(`Error occurred while logging out: ${err}`, "ERROR");
          return of(AuthActions.logoutFailure())
        })
      );
    })
  ))

  autoLogin$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.autoLogin),
    switchMap(() => {
      return this.authService.autoLogin().pipe(
        map((user) => {
          return AuthActions.autoLoginSuccess({userData: {...user}})
        }),
        catchError((err) => of(AuthActions.autoLoginFailure()))
      );
    })
  ));

}
