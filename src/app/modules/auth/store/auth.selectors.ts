import {AppState} from "../../../store/app.reducer";
import {AuthState} from "./auth.reducer";
import {createSelector} from "@ngrx/store";

export const authSelector = (state: AppState) => state.auth;

export const authUserSelector = createSelector(authSelector, (state: AuthState) => state.user)

export const authLoadingSelector = createSelector(authSelector, (state: AuthState) => state.loading)

export const authErrorSelector = createSelector(authSelector, (state: AuthState) => state.error)
