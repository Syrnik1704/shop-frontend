import {createAction, props} from "@ngrx/store";
import {LoginData, RegisterData, UserData} from "../../core/models/auth.model";

export const login = createAction('[Auth] Login', props<{loginData: LoginData}>());

export const loginSuccess = createAction("[Auth] Login Success", props<{userData: UserData}>());

export const loginFailure = createAction("[Auth] Login Failure", props<{error: string}>());

export const register = createAction("[Auth] Register", props<{registerData: RegisterData}>());

export const registerSuccess = createAction("[Auth] Register Success");

export const registerFailure = createAction("[Auth] Register Failure", props<{error: string}>());

export const clearError = createAction("[Auth] Clear Error");

export const logout = createAction("[Auth] Logout");

export const logoutSuccess = createAction("[Auth] Logout Success");

export const logoutFailure = createAction("[Auth] Logout Failure");

