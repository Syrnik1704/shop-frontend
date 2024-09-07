import {AppState} from "../../../store/app.reducer";

export const authSelector = (state: AppState) => state.auth;

export const authUserSelector = (state: AppState) => state.auth.user;

export const authLoadingSelector = (state: AppState) => state.auth.loading;

export const authErrorSelector = (state: AppState) => state.auth.error;
