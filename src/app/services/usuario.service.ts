import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Usuario {
  correo: string;
  contrasena: string;
  telefono: string;
  nombre: string;
  rol: string;
  cedula: string;
}
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = 'http://localhost:8082/usuarios'; 

  constructor(private http: HttpClient) {}

  getUsuario(): Observable<Usuario> {
    const token: string = localStorage.getItem('authToken') || '';
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Usuario>(`${this.apiUrl}`, { headers });
  }
}