import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
export interface ListaCompra {
id: number;
nombre: string;
fecha: string;
}
@Injectable({
  providedIn: 'root'
})
export class ListService {

  private apiUrl = 'http://localhost:8082/api/list';

  constructor(private http: HttpClient) {}


 


  getAllLists(token:string): Observable<ListaCompra[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<ListaCompra[]>(`${this.apiUrl}/getAll`, { headers });
  }
  saveList(list: ListaCompra, token:string): Observable<ListaCompra> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<ListaCompra>(`${this.apiUrl}/add`, list, { headers });
  }
  deleteList(id: number, token:string): Observable<void> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`, { headers });
  }
}
