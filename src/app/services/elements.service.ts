import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
export interface ElementoLista {
  id: number;
  nombre: string;
  sitio: string;
  idLista: number;
}
export interface Sitio {
  id: number;
  nombre: string;
}
@Injectable({
  providedIn: 'root'
})
export class ElementsService {
  private apiUrl = 'http://localhost:8082/api/element';
  private idListaSubject: BehaviorSubject<string> = new BehaviorSubject<string>(''); 
  public idLista$ = this.idListaSubject.asObservable(); 


  setIdLista(idLista: string) {
    this.idListaSubject.next(idLista); 
  }
  constructor( private http: HttpClient) {}
  getElementsByListId(): Observable<any> {
    const idLista = this.idListaSubject.getValue(); 
    if (!idLista) {
      throw new Error('idLista no está definido');
    }
    return this.http.get<any>(`${this.apiUrl}/get/${idLista}`);
  }
 
  saveElement(element: ElementoLista): Observable<ElementoLista> {
    element.idLista = parseInt(this.idListaSubject.getValue());
    return this.http.post<ElementoLista>(`${this.apiUrl}/add`, element);
  }
  deleteElement(id: number): void {
    return;
  }
}
