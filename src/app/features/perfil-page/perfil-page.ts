import { Component, inject, signal } from '@angular/core';
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
export class PerfilPage {
  private authService = inject(AuthService);
  private usuariosService = inject(UsuariosService);
  private router = inject(Router);

  editing = signal(false);
  saving = signal(false);
  mensaje = signal<{ tipo: string; texto: string } | null>(null);

  nombre = signal('');
  correo = signal('');
  telefono = signal('');
  direccion = signal('');
  foto = signal('');

  ngOnInit(): void {
    if (!this.authService.sesionIniciada()) {
      this.router.navigate(['/login']);
      return;
    }

    const usuario = this.usuariosService.usuarioAutenticado();
    if (usuario) {
      this.nombre.set(usuario.nombre);
      this.correo.set(usuario.correo);
      this.foto.set(usuario.foto || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(usuario.nombre) + '&background=fe4d01&color=fff');
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
      nombre: this.nombre(),
      correo: this.correo()
    };

    this.usuariosService.putUsuario(usuarioActual.id, usuarioActualizado).subscribe({
      next: () => {
        this.usuariosService.setUsuario(usuarioActualizado);
        localStorage.setItem('usuario', JSON.stringify(usuarioActualizado));
        this.mensaje.set({ tipo: 'success', texto: 'Perfil actualizado correctamente' });
        this.editing.set(false);
        this.saving.set(false);
        setTimeout(() => this.mensaje.set(null), 3000);
      },
      error: () => {
        this.mensaje.set({ tipo: 'error', texto: 'Error al guardar los cambios' });
        this.saving.set(false);
      }
    });
  }

  cerrarSesion(): void {
    if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
      this.authService.logout();
    }
  }
}
