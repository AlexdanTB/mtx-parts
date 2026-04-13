import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth-service';
import { UsuariosService } from '../../service/usuarios-service';

@Component({
  selector: 'app-perfil-page',
  imports: [CommonModule, FormsModule],
  templateUrl: './perfil-page.html',
  styleUrl: './perfil-page.css',
})
export class PerfilPage implements OnInit {
  private authService = inject(AuthService);
  private usuariosService = inject(UsuariosService);
  private router = inject(Router);

  editing = signal(false);
  saving = signal(false);
  mensaje = signal<{ tipo: string; texto: string } | null>(null);

  nombreCompleto = signal('');
  email = signal('');
  telefono = signal('');
  direccion = signal('');

  ngOnInit(): void {
    if (!this.authService.sesionIniciada()) {
      this.router.navigate(['/login']);
      return;
    }

    const usuario = this.usuariosService.usuarioAutenticado();
    if (usuario) {
      this.nombreCompleto.set(usuario.nombreCompleto || '');
      this.email.set(usuario.email || '');
      this.telefono.set(usuario.telefono || '');
      this.direccion.set(usuario.direccion || '');
    }
  }

  toggleEditing(): void {
    this.editing.set(!this.editing());
  }

  guardarCambios(): void {
    this.saving.set(true);
    const usuarioActual = this.usuariosService.usuarioAutenticado();

    if (!usuarioActual?.id) {
      this.mensaje.set({ tipo: 'error', texto: 'No se pudo identificar el usuario' });
      this.saving.set(false);
      return;
    }

    const usuarioActualizado = {
      ...usuarioActual,
      nombreCompleto: this.nombreCompleto(),
      email: this.email(),
      telefono: this.telefono(),
      direccion: this.direccion()
    };

    this.usuariosService.actualizarUsuario(usuarioActual.id, usuarioActualizado).subscribe({
      next: (updated) => {
        this.usuariosService.setUsuario(updated);
        localStorage.setItem('usuario', JSON.stringify(updated));
        this.mensaje.set({ tipo: 'success', texto: 'Perfil actualizado correctamente' });
        this.editing.set(false);
        this.saving.set(false);
        setTimeout(() => this.mensaje.set(null), 3000);
      },
      error: (err) => {
        this.mensaje.set({ tipo: 'error', texto: 'Error al guardar los cambios' });
        this.saving.set(false);
        console.error(err);
      }
    });
  }

  cerrarSesion(): void {
    if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
      this.authService.logout();
      this.router.navigate(['/']);
    }
  }
}
