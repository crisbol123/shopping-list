import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonLabel, IonItem, IonText, IonSpinner, IonButton } from '@ionic/angular/standalone';
import { Usuario, UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [
    IonSpinner,
    IonText,
    IonItem,
    IonLabel,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton, // Asegúrate de incluir IonButton aquí
    CommonModule,
    FormsModule
  ]
})
export class ProfilePage implements OnInit {
  usuario: Usuario | null = null;
  telefonoVisible: boolean = false;
  cedulaVisible: boolean = false;

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit() {
    this.loadUsuario();
  }

  loadUsuario() {
    this.usuarioService.getUsuario().subscribe({
      next: (data) => {
        this.usuario = data;
        console.log('Usuario cargado:', data);
      },
      error: (err) => {
        console.error('Error al cargar usuario:', err);
      },
    });
  }
}
