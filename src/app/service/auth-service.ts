import { inject, Injectable, signal } from '@angular/core';
import { UsuariosService } from './usuarios-service';
import { Router } from '@angular/router';
import { map } from 'rxjs/internal/operators/map';
import { Observable } from 'rxjs/internal/Observable';
import { Usuarios } from '../models/usuarios';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /*
  private servicioUsuario = inject(UsuariosService);
  private router = inject(Router);
  private http = inject(HttpClient);
  private API_LOGIN = 'http://localhost:8080/login';
  
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
  }*/

  private http = inject(HttpClient);
  sesionIniciada = signal<boolean>(localStorage.getItem('sesion') === 'true');

  public rolActual = signal<string | null>(localStorage.getItem('rol'));
  private API_LOGIN = 'http://localhost:8080/login';

  login(email: string, password: string): Observable<boolean> {
    return this.http.post<Usuarios | null>(this.API_LOGIN, { email, password }).pipe(
      map(usuarioCoincide => {
        if (usuarioCoincide) {
          localStorage.setItem('sesion', 'true');
          localStorage.setItem('usuario', JSON.stringify(usuarioCoincide));

          localStorage.setItem('rol', usuarioCoincide.rol);
          this.rolActual.set(usuarioCoincide.rol);
          this.sesionIniciada.set(true);

          return true;
        }
        return false;
      })
    );

  }

  logout(): void {
    localStorage.removeItem('sesion');
    localStorage.removeItem('rol');
    localStorage.removeItem('usuario');
    this.sesionIniciada.set(false);
    this.rolActual.set(null);

  }
}
