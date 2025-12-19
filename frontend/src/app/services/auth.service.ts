import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private API = 'http://localhost:5000/api/auth';

  constructor(private http: HttpClient) {}

  signup(data: any): Observable<any> {
    return this.http.post(`${this.API}/signup`, data);
  }

  signin(data: any): Observable<any> {
    return this.http.post(`${this.API}/signin`, data);
  }

  logout() {
    localStorage.clear();
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getUser() {
    return {
      token: localStorage.getItem('token'),
      role: localStorage.getItem('role'),
      name: localStorage.getItem('name')
    };
  }

  getAuthHeader() {
    return new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
  }
}
