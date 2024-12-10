import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
  private apiUrl = 'https://localhost:8082/api/list';
  constructor( private http: HttpClient) {}
  getElementsByListId(idLista: number): Observable<ElementoLista[]> {
   return this.http.get<ElementoLista[]>(`${this.apiUrl}/lists/${idLista}/items`);
  }
 
  saveElement(element: ElementoLista): ElementoLista {
    return element;
  }
  deleteElement(id: number): void {
    return;
  }
}
