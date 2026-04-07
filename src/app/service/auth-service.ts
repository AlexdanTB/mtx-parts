import { inject, Injectable, signal } from '@angular/core';
import { UsuariosService } from './usuarios-service';
import { Router } from '@angular/router';
import { map } from 'rxjs/internal/operators/map';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private servicioUsuario = inject(UsuariosService);
  private router = inject(Router);

  sesionIniciada = signal<boolean>(localStorage.getItem('sesion') === 'true');
  rolActual = signal<string | null>(localStorage.getItem('rol'));

  login(correo: string, contrasena: string): Observable<boolean> {
    return this.servicioUsuario.getUsuarios().pipe(
      map(usuarios => {
        const usuario = usuarios.find(
          u => u.correo === correo && u.contrasena === contrasena
        );

        if (usuario) {
          localStorage.setItem('sesion', 'true');
          localStorage.setItem('rol', usuario.rol);
          localStorage.setItem('usuario', JSON.stringify(usuario));
          this.sesionIniciada.set(true);
          this.rolActual.set(usuario.rol);
          this.servicioUsuario.setUsuario(usuario);
          return true;
        }
        return false;
      })
    );
  }

  logout(): void {
    this.servicioUsuario.setUsuario(null);
    localStorage.removeItem('sesion');
    localStorage.removeItem('rol');
    localStorage.removeItem('usuario');
    this.sesionIniciada.set(false);
    this.rolActual.set(null);
    this.router.navigate(['/']);

  }
}
