import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
export interface ElementoLista {
  id: number;
  nombre: string;
  sitio: string;
  idLista: number;
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
 
  saveElement(element: ElementoLista): ElementoLista {
    return element;
  }
  deleteElement(id: number): void {
    return;
  }
}
