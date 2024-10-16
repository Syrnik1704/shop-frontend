import {User} from "../../core/models/auth.model";
import {Action, createReducer, on} from "@ngrx/store";
import * as AuthActions from "./auth.actions";

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
}

const _authReducer = createReducer(initialState,
  on(AuthActions.login, (state, action) => ({
    ...state,
    loading: true,
  })),
  on(AuthActions.loginSuccess, (state, action) => ({
    ...state,
    loading: false,
    user: new User(
      action.userData.login,
      action.userData.email,
      action.userData.role
    ),
    error: null,
  })),
  on(AuthActions.loginFailure, (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
  })),
  on(AuthActions.register, (state, action) => ({
    ...state,
    loading: true,
  })),
  on(AuthActions.registerSuccess, (state, action) => ({
    ...state,
    loading: false,
    error: null,
  })),
  on(AuthActions.registerFailure, (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
  })),
  on(AuthActions.clearError, (state, action) => ({
    ...state,
    error: null,
  })),
  on(AuthActions.logout, (state, action) => ({
    ...state,
  })),
  on(AuthActions.logoutSuccess, (state, action) => ({
    ...state,
    user: null,
    error: null,
  })),
  on(AuthActions.logoutFailure, (state, action) => ({
    ...state,
  })),
  on(AuthActions.autoLogin, (state, action) => ({
    ...state
  })),
  on(AuthActions.autoLoginSuccess, (state, action) => ({
      ...state,
      user: new User(
        action.userData.login,
        action.userData.email,
        action.userData.role
      )
    })),
    on(AuthActions.autoLoginFailure, (state, action) => ({
      ...state,
    })),
);

export function authReducer(authState: AuthState | undefined, action: Action) {
  return _authReducer(authState, action)
}
