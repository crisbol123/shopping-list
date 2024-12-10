import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonFooter, IonButton, IonSelectOption, ModalController } from '@ionic/angular/standalone';
import { ListService } from '../services/list.service';
import { ElementoLista, ElementsService, Sitio } from '../services/elements.service';

@Component({
  selector: 'app-new-element-modal',
  templateUrl: './new-element-modal.page.html',
  styleUrls: ['./new-element-modal.page.scss'],
  standalone: true,
  imports: [IonSelectOption,IonButton, IonFooter, IonLabel, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class NewElementModalPage {

  newItem: ElementoLista = {
    id: 0,
    nombre: '',
    sitio: '',
    idLista: 0,
  };
  
  sitios: Sitio[] = [];

  constructor(
    private modalCtrl: ModalController,
    private elementService: ElementsService,
    private sitioService: sitioService
  ) {}
  
  saveList() {
    const newList: ElementoLista = {
      id: 0,
      nombre: this.newItem.nombre,
      sitio: this.newItem.sitio,
      idLista: 0
    };

    this.elementService.saveElement(newList).subscribe((result) => {
      this.modalCtrl.dismiss(result);
    });
  }

  loadSitios() {
    this.elementService.getSitios().subscribe((data) => {
      this.sitios = data;
    });
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
