import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Usuarios } from '../models/usuarios';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {

   private http = inject(HttpClient);
 private API_USUARIOS = 'http://localhost:8080/usuarios/actualizarUsuario';  
  
  usuarioAutenticado = signal<Usuarios | null>(
    JSON.parse(localStorage.getItem('usuario') || 'null')
  );

  setUsuario(usuario: Usuarios | null): void {
    this.usuarioAutenticado.set(usuario);
  }

  getUsuarios(): Observable<Usuarios[]> {
    /*return this.http.get<{ [key: string]: Usuarios }>(
      `${this.API_USUARIOS}`
    );
    ).pipe(
      map(resp => {
        if (!resp) return [];
        return Object.keys(resp).map(id => ({ ...resp[id], id }));
      })
    );*/
    return this.http.get<Usuarios[]>(`${this.API_USUARIOS}`);
  }

  postUsuario(usuario: Usuarios): Observable<any> {
    return this.http.post(`${this.API_USUARIOS}`, usuario);
  }

  putUsuario(id: string, usuario: Usuarios): Observable<any> {
    const { id: _, ...sinId } = usuario;
    return this.http.put(`${this.API_USUARIOS}/${id}`, sinId);
  }

  deleteUsuario(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_USUARIOS}/${id}`);
  }
}
