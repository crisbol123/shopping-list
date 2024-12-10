import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8085/usuarios/login';

  constructor(private http: HttpClient) { }

  login(cedula: string, contrasena: string): Observable<any> {
    const loginData = { cedula, contrasena };
    return this.http.post<any>(this.apiUrl, loginData);
  }
}
