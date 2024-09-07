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
