export class User implements UserData {
  constructor(public login: string, public email: string, public role: string) {}
}

export interface UserData {
  login: string;
  email: string;
  role: string;
}

export interface LoginData {
  login: string;
  password: string;
}

export interface RegisterData {
  email: string;
  login: string;
  password: string;
}

export interface AuthResponse {
  timestamp: string;
  message: string;
  code: string;
}

export interface RecoverPasswordData {
  email: string;
}

export interface ResetPasswordData {
  password: string;
  uid: string;
}

export interface LoggedInResponse extends Omit<AuthResponse, "message"> {
  message: boolean;
}

