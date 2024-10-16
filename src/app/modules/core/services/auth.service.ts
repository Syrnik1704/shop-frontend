import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment.development";
import {HttpClient, HttpParams} from "@angular/common/http";
import {
  LoginData,
  RecoverPasswordData,
  RegisterData,
  AuthResponse,
  ResetPasswordData,
  UserData, LoggedInResponse
} from "../models/auth.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  login(body: LoginData): Observable<UserData> {
    return this.httpClient.post<UserData>(`${environment.apiUrl}/auth/login`, body, {
      withCredentials: true //cookies
    });
  }

  logout(): Observable<AuthResponse> {
    return this.httpClient.get<AuthResponse>(`${environment.apiUrl}/auth/logout`, {
      withCredentials: true //cookies
    });
  }

  isLoggedIn(): Observable<LoggedInResponse> {
    return this.httpClient.get<LoggedInResponse>(`${environment.apiUrl}/auth/logged-in`, {
      withCredentials: true //cookies
    });
  }

  autoLogin(): Observable<UserData> {
    return this.httpClient.get<UserData>(`${environment.apiUrl}/auth/auto-login`, {
      withCredentials: true
    });
  }

  register(body: RegisterData): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${environment.apiUrl}/auth/register`, body);
  }

  activateAccount(uid: string): Observable<AuthResponse> {
    const params = new HttpParams().append("uid", uid);
    return this.httpClient.get<AuthResponse>(`${environment.apiUrl}/auth/activate`, {
      params,
    });
  }

  recoverPassword(body: RecoverPasswordData): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${environment.apiUrl}/auth/reset-password`, body);
  }

  resetPassword(body: ResetPasswordData): Observable<AuthResponse> {
    return this.httpClient.patch<AuthResponse>(`${environment.apiUrl}/auth/reset-password`, body);
  }
}
