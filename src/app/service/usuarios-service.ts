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
  private API_FIREBASE = 'https://projectmtx-68218-default-rtdb.firebaseio.com/';
  
  
  usuarioAutenticado = signal<Usuarios | null>(
    JSON.parse(localStorage.getItem('usuario') || 'null')
  );

  setUsuario(usuario: Usuarios | null): void {
    this.usuarioAutenticado.set(usuario);
  }


  getUsuarios(): Observable<Usuarios[]> {
    return this.http.get<{ [key: string]: Usuarios }>(
      `${this.API_FIREBASE}/usuarios.json`
    ).pipe(
      map(resp => {
        if (!resp) return [];
        return Object.keys(resp).map(id => ({ ...resp[id], id }));
      })
    );
  }

  postUsuario(usuario: Usuarios): Observable<any> {
    return this.http.post(`${this.API_FIREBASE}/usuarios.json`, usuario);
  }

  putUsuario(id: string, usuario: Usuarios): Observable<any> {
    const { id: _, ...sinId } = usuario;
    return this.http.put(`${this.API_FIREBASE}/usuarios/${id}.json`, sinId);
  }

  deleteUsuario(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_FIREBASE}/usuarios/${id}.json`);
  }
}
