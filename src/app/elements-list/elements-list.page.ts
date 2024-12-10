import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonSpinner, IonButtons, IonButton, IonInput, ModalController, IonFooter } from '@ionic/angular/standalone';
import { ElementoLista, ElementsService } from '../services/elements.service';
import { ListService } from '../services/list.service';
import { NewElementModalPage } from '../new-element-modal/new-element-modal.page';
import { Router } from '@angular/router';
@Component({
  selector: 'app-elements-list',
  templateUrl: './elements-list.page.html',
  styleUrls: ['./elements-list.page.scss'],
  standalone: true,
  imports: [IonFooter,  IonInput,IonButton, IonButtons, IonSpinner, IonLabel, IonItem,  IonList, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ElementsListPage implements OnInit {
  elements: ElementoLista[] = []; 
  isLoading: boolean = true;
  form: FormGroup;

  constructor(private elementservice: ElementsService,private modalCtrl: ModalController, private fb: FormBuilder, private router: Router)
  { 
    this.form = this.fb.group({
      nombre: ['', [Validators.required]],
      sitio: ['']
    });
  }

  ngOnInit() {
    
    this.elementservice.setIdLista('4'); 
    this.fetchElements();
  }

  fetchElements() {
    this.elementservice.getElementsByListId().subscribe({
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
  agregarElemento() {
    this.router.navigate(['/new-element-modal']);
} 
}