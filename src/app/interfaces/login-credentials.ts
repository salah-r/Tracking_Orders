export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RevokeToken {
  token: string;
  refreshToken: string;
}

