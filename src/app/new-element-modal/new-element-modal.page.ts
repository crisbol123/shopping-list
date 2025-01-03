import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonFooter, IonButton, IonSelect, IonSelectOption, ModalController } from '@ionic/angular/standalone';
import { ListService } from '../services/list.service';
import { ElementoLista, ElementsService, Sitio } from '../services/elements.service';
import { SitioService } from '../services/sitio.service';
import { Route, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { NewSitioModalPage } from '../new-sitio-modal/new-sitio-modal.page';
@Component({
  selector: 'app-new-element-modal',
  templateUrl: './new-element-modal.page.html',
  styleUrls: ['./new-element-modal.page.scss'],
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule, 
 CommonModule, IonicModule
  ]
})
export class NewElementModalPage implements OnInit {
sitios: Sitio[] = [];
form!: FormGroup;

constructor(
  private fb: FormBuilder,
  private modalCtrl: ModalController,
  private elementService: ElementsService,
  private sitioService: SitioService,
  private router: Router
) {
}

  ngOnInit(): void {
    this.loadSitios();

    this.form = this.fb.group({
      nombre: [''],
      idSitio: [''],
    });
  }
  

  loadSitios() {
    this.sitioService.getSitios().subscribe((data) => {
      this.sitios = data;
      console.log(data);
    });
  }
  dismiss() {
   this.modalCtrl.dismiss();

  }


saveElement() {
  if (this.form.valid) {
    const newItem: ElementoLista = {
      id: 0,
      ...this.form.value,
      idLista: 0,
    };
console.log(newItem);
    this.elementService.saveElement(newItem).subscribe((data) => {
 this.modalCtrl.dismiss(data);
    });
  }
} 

openNewSiteModal() {
  this.modalCtrl.create({
    component: NewSitioModalPage
  }).then((modal) => {
    modal.onDidDismiss().then((result) => {
      if (result.data) {
        this.loadSitios();
      }
    });
    modal.present();
  });
}

}