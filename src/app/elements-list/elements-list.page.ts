import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonSpinner, IonButtons, IonButton } from '@ionic/angular/standalone';
import { ElementoLista, ElementsService } from '../services/elements.service';
import { ListService } from '../services/list.service';
@Component({
  selector: 'app-elements-list',
  templateUrl: './elements-list.page.html',
  styleUrls: ['./elements-list.page.scss'],
  standalone: true,
  imports: [IonButton, IonButtons, IonSpinner, IonLabel, IonItem,  IonList, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ElementsListPage implements OnInit {
  elements: ElementoLista[] = []; 
  isLoading: boolean = true;

  constructor(private listService: ListService) { }

  ngOnInit() {
    
    this.listService.setIdLista('123'); 
    this.fetchElements();
  }

  fetchElements() {
    this.listService.getElementsByListId().subscribe({
      next: (data) => {
        this.elements = data; 
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al obtener los elementos', err);
        this.isLoading = false;
      }
    });
  }
  newElement() {
    console.log('Crear nuevo elemento');
  }
}