import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl: string = environment.apiURl;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  login(payload: any) {
    return this.http.post<any>(`${this.baseUrl}Authentication/login`, payload, {
      headers: { 'operation-type': 'GetAll' },
    });
  }

  saveAuth(res: any) {
    localStorage.setItem('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    localStorage.setItem('expiry', res.expiry);
  }

  getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }

  isTokenExpired(): boolean {
    const expiry = localStorage.getItem('expiry');
    return !expiry || new Date(expiry) <= new Date();
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['auth/login']);
  }

  refreshToken() {
    return this.http.post<any>(`${this.baseUrl}/refresh`, {
      refreshToken: this.getRefreshToken(),
    });
  }
}
