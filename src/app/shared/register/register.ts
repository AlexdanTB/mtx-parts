import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../service/auth-service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private authService = inject(AuthService);
  private router = inject(Router);

  loading = signal(false);
  errorMessage = signal('');

  nuevoUsuario = {
    nombreCompleto: '',
    email: '',
    password: '',
    telefono: '',
    direccion: ''
  };

  registrarUsuario() {
    if (!this.nuevoUsuario.nombreCompleto || !this.nuevoUsuario.email || !this.nuevoUsuario.password) {
      this.errorMessage.set('Por favor complete los campos obligatorios');
      return;
    }

    this.loading.set(true);
    this.errorMessage.set('');

    this.authService.register(this.nuevoUsuario).subscribe({
      next: (response) => {
        if (response.success) {
          alert('Usuario registrado correctamente');
          this.router.navigate(['/login']);
          this.limpiarFormulario();
        } else {
          this.errorMessage.set(response.message || 'Error al registrar');
        }
        this.loading.set(false);
      },
      error: (err) => {
        this.loading.set(false);
        this.errorMessage.set('Error al registrar el usuario');
        console.error(err);
      }
    });
  }

  limpiarFormulario() {
    this.nuevoUsuario = {
      nombreCompleto: '',
      email: '',
      password: '',
      telefono: '',
      direccion: ''
    };
  }
}
