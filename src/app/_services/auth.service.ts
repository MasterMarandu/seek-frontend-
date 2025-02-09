import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

const AUTH_API = 'http://159.223.202.94:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'login',
      {
        username,
        password,
      },
      httpOptions
    );
  }

  logout(): Observable<any> {
    const token = `Bearer ${localStorage.getItem('auth-token')}`;
    return this.http.post(AUTH_API + 'signout', {}, {
      headers: new HttpHeaders({ Authorization: token })
    }).pipe(
      tap(() => {
        alert();
        // Limpia el token local después de que el backend responda exitosamente
        localStorage.removeItem('auth-token');
      })
    );
  }
}
