
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoginCredentials } from 'src/app/interfaces/login-credentials';
import { LoginResponse } from 'src/app/interfaces/login-response';
import { environment } from 'src/environment/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.APIURL}auth`; // Replace with your actual API endpoint
  private tokenKey = 'auth_token';
  private userKey = 'user_data';

  constructor(private http: HttpClient) { }

  login(credentials: LoginCredentials): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}`, credentials)
      .pipe(
        tap(response => {
          this.storeAuthData(response);
        })
      );
  }

  private storeAuthData(response: LoginResponse): void {
    localStorage.setItem(this.tokenKey, response.token);
    localStorage.setItem(this.userKey, JSON.stringify(response.email));
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUserData(): any {
    const userData = localStorage.getItem(this.userKey);
    return userData ? JSON.parse(userData) : null;
  }

  decodeToken(token: string): any {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }
    const payload = parts[1];
    const decoded = atob(payload); // Decode base64 URL-encoded string
    return JSON.parse(decoded);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
