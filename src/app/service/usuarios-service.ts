import { inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Usuarios } from '../models/usuarios';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  private readonly API_URL = 'http://localhost:8080/usuarios';
  private http = inject(HttpClient);

  usuarioAutenticado = signal<Usuarios | null>(
    JSON.parse(localStorage.getItem('usuario') || 'null')
  );

  setUsuario(usuario: Usuarios | null): void {
    this.usuarioAutenticado.set(usuario);
    if (usuario) {
      localStorage.setItem('usuario', JSON.stringify(usuario));
    }
  }

  getUsuarios(): Observable<Usuarios[]> {
    return this.http.get<Usuarios[]>(this.API_URL).pipe(
      catchError(this.handleError)
    );
  }

  getUsuarioPorId(id: number): Observable<Usuarios> {
    return this.http.get<Usuarios>(`${this.API_URL}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  getMiPerfil(): Observable<Usuarios> {
    return this.http.get<Usuarios>(`${this.API_URL}/mi-perfil`).pipe(
      catchError(this.handleError)
    );
  }

  crearUsuario(usuario: Partial<Usuarios>): Observable<Usuarios> {
    return this.http.post<Usuarios>(this.API_URL, usuario).pipe(
      catchError(this.handleError)
    );
  }

  actualizarUsuario(id: number, usuario: Partial<Usuarios>): Observable<Usuarios> {
    return this.http.put<Usuarios>(`${this.API_URL}/${id}`, usuario).pipe(
      catchError(this.handleError)
    );
  }

  eliminarUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let mensaje = 'Error desconocido';
    if (error.error?.message) {
      mensaje = error.error.message;
    } else if (error.status === 401) {
      mensaje = 'No autorizado';
    } else if (error.status === 404) {
      mensaje = 'Usuario no encontrado';
    }
    return throwError(() => new Error(mensaje));
  }
}
