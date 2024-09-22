import { Component } from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../../../../store/app.reducer";
import * as AuthActions from "../../../auth/store/auth.actions"
import {Observable} from "rxjs";
import {authUserSelector} from "../../../auth/store/auth.selectors";
import {User} from "../../models/auth.model";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  user$: Observable<User | null>;

  constructor(private store: Store<AppState>) {
    this.user$ = this.store.select(authUserSelector);
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
  }
}
