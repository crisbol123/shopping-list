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

  private apiUrl = 'https://localhost:8082/api/list';
  private idListaSubject: BehaviorSubject<string> = new BehaviorSubject<string>(''); 
  public idLista$ = this.idListaSubject.asObservable(); 
  constructor(private http: HttpClient) {}


  setIdLista(idLista: string) {
    this.idListaSubject.next(idLista); 
  }

  getElementsByListId(): Observable<any> {
    const idLista = this.idListaSubject.getValue(); 
    if (!idLista) {
      throw new Error('idLista no está definido');
    }
    return this.http.get<any>(`${this.apiUrl}/lists/${idLista}/items`);
  }
  getAllLists(token:string): Observable<ListaCompra[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<ListaCompra[]>(`${this.apiUrl}/getAll`, { headers });
  }
  saveList(list: ListaCompra): Observable<ListaCompra> {
    return this.http.post<ListaCompra>(`${this.apiUrl}/save`, list);
  }
  deleteList(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
