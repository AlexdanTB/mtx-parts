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
  
  private servicioUsuario = inject(UsuariosService);
  

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
          this.servicioUsuario.setUsuario(usuarioCoincide);
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
    
    this.servicioUsuario.setUsuario(null);

  }
}
