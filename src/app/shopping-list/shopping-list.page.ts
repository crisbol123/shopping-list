import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { ListaCompra, ListService } from '../services/list.service';
import { NewListModalComponent } from '../new-list-modal/new-list-modal.component';
import { ElementSchemaRegistry, Token } from '@angular/compiler';
import { ElementsService } from '../services/elements.service';
@Component({
  selector: 'app-shopping-list',
  standalone: true,
  imports: [HttpClientModule,IonicModule, CommonModule, FormsModule],
  templateUrl: './shopping-list.page.html',
  styleUrls: ['./shopping-list.page.scss'],
})
export class ShoppingListPage implements OnInit {
  shoppingLists: ListaCompra[] = [];

  constructor(
    private listService: ListService,
    private modalCtrl: ModalController, 
    private elementService: ElementsService
  ) {}

  ngOnInit() {
    this.loadLists();
  }

  loadLists() {
    const token: string = localStorage.getItem('authToken') || '';
    this.listService.getAllLists(token).subscribe((lists) => {
      this.shoppingLists = lists;
    });
  }

  deleteList(id: number) {
    this.listService.deleteList(id, localStorage.getItem('authToken') || '').subscribe(() => {
      this.shoppingLists = this.shoppingLists.filter((list) => list.id !== id);
    });
  }

  async openNewListModal() {
    const modal = await this.modalCtrl.create({
      component: NewListModalComponent,
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        this.loadLists();
      }
    });

    return await modal.present();
  }
  seleccionarLista(id: number) {
this.elementService.setIdLista(id);
  }
}

