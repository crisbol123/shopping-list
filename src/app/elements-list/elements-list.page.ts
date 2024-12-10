import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonSpinner, IonButtons, IonButton, IonInput, ModalController, IonFooter, IonIcon, IonItemOption, IonItemOptions, IonItemSliding } from '@ionic/angular/standalone';
import { ElementoLista, ElementsService } from '../services/elements.service';
import { ListService } from '../services/list.service';
import { NewElementModalPage } from '../new-element-modal/new-element-modal.page';
import { Router } from '@angular/router';
@Component({
  selector: 'app-elements-list',
  templateUrl: './elements-list.page.html',
  styleUrls: ['./elements-list.page.scss'],
  standalone: true,
  imports: [IonItemSliding, IonItemOptions, IonItemOption, IonIcon, IonFooter,  IonInput,IonButton, IonButtons, IonSpinner, IonLabel, IonItem,  IonList, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ElementsListPage implements OnInit {
  elements: ElementoLista[] = []; 
  isLoading: boolean = true;
  form: FormGroup;

  constructor(private elementService: ElementsService,private modalCtrl: ModalController, private fb: FormBuilder, private router: Router)
  { 
    this.form = this.fb.group({
      nombre: ['', [Validators.required]],
      sitio: ['']
    });
  }

  ngOnInit() {
    this.elementService.setIdILista();
    this.elementService.getIdLista().subscribe((idLista) => {
      if (idLista !== null) {
        this.fetchElements();
      }
    });
  }

  fetchElements() {
    this.elementService.getElementsByListId().subscribe((data) => {
      this.elements = data;
      this.isLoading = false;
    });
  }
  agregarElemento() {

    this.modalCtrl.create({
      component: NewElementModalPage
    }).then((modal) => {
      modal.onDidDismiss().then(() => {
        this.fetchElements();
      });
      modal.present();
    });
} 

toggleComprado(element: ElementoLista) {
  element.comprado = !element.comprado;
  this.elementService.updateElement(element).subscribe(() => {
    this.fetchElements();
  });
}

deleteElement(id: number) {
  this.elementService.deleteElement(id);
  this.fetchElements();
 
} }