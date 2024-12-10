import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { SitioService } from '../services/sitio.service';
@Component({
  selector: 'app-new-sitio-modal',
  templateUrl: './new-sitio-modal.page.html',
  styleUrls: ['./new-sitio-modal.page.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule]
})
export class NewSitioModalPage  {
 form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private modalCtrl: ModalController,
    private sitioService: SitioService
  ) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required]],
    });
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  saveSite() {
    if (this.form.valid) {
      const newSitio = this.form.value;

      this.sitioService.saveSitio(newSitio).subscribe(() => {
        this.modalCtrl.dismiss(newSitio);
      });
    }
  }

}
