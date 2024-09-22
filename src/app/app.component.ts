import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "./store/app.reducer";
import * as AuthActions from "../app/modules/auth/store/auth.actions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'shop-frontend';

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(AuthActions.autoLogin());
  }
}
