import { Component } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ListService, ListaCompra } from '../services/list.service';
import { HttpClientModule } from '@angular/common/http';
import { ElementoLista } from '../services/elements.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-new-list-modal',
  standalone: true,
  imports: [HttpClientModule, IonicModule, FormsModule, CommonModule],
  templateUrl: './new-list-modal.component.html',
  styleUrls: ['./new-list-modal.component.scss'],
})
export class NewListModalComponent {
  newItem: ListaCompra = {
    id: 0,
    nombre: '',
    fecha: new Date().toISOString(),
  };

  constructor(
    private modalCtrl: ModalController,
    private listService: ListService, private router: Router
  ) {}

  saveList() {
    const newList: ListaCompra = {
      id: 0,
      nombre: this.newItem.nombre,
      fecha: new Date().toISOString()
    };

    this.listService.saveList(newList, localStorage.getItem('authToken') || '').subscribe((result) => {
      this.modalCtrl.dismiss(result);
    });
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
}

