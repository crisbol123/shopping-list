import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

export interface ElementoLista {
  id: number;
  nombre: string;
  sitio: string;
  idLista: number;
  comprado: boolean;
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

  private idListaSubject: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);


 
  constructor( private http: HttpClient) {}

  setIdILista(): void {
 this.http.get<number>(`${this.apiUrl}/getListaId`).subscribe((id) => {
      localStorage.setItem('idLista', id.toString());
      this.idListaSubject.next(id);
      console.log('idLista', id);
    });
  }
setIdLista(id: number): void {
    localStorage.setItem('idLista', id.toString());
    this.idListaSubject.next(id);
  }

  getIdLista(): Observable<number | null> {
    return this.idListaSubject.asObservable();
  }


  getElementsByListId(): Observable<any> {
    return this.idListaSubject.pipe(
      switchMap((idLista) => {
        if (idLista !== null) {
          return this.http.get<any[]>(`${this.apiUrl}/get/${idLista}`);
        } else {
          return [];
        }
      })
    );
  }
 
  saveElement(element: ElementoLista): Observable<ElementoLista> {
    element.idLista = parseInt(localStorage.getItem('idLista') || '0');
    element.comprado = false;
    return this.http.post<ElementoLista>(`${this.apiUrl}/add`, element);
  }
  updateElement(element: ElementoLista): Observable<ElementoLista> {
    return this.http.post<ElementoLista>(`${this.apiUrl}/update`, element);
  }
    deleteElement(id: number): void {
    this.http.delete(`${this.apiUrl}/delete/${id}`);
  }
}
