import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
export interface Sitio {
  id: number;
  nombre: string;
}
@Injectable({
  providedIn: 'root'
})
export class SitioService {
  private apiUrl = 'http://localhost:8082/api/sitio'; 

  constructor(private http: HttpClient) { }

  getSitios(): Observable<Sitio[]> {
    return this.http.get<Sitio[]>(`${this.apiUrl}/getAll`);
  }

  saveSitio(sitio: Sitio): Observable<Sitio> {
    return this.http.post<Sitio>(`${this.apiUrl}/add`, sitio);
  }
}
