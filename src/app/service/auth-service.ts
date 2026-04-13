import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL = 'http://localhost:8080/auth';
  private http = inject(HttpClient);

  sesionIniciada = signal<boolean>(localStorage.getItem('sesion') === 'true');
  rolActual = signal<string | null>(localStorage.getItem('rol'));

  login(email: string, password: string): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.API_URL}/login`, { email, password });
  }

  register(datos: {
    nombreCompleto: string;
    email: string;
    password: string;
    telefono?: string;
    direccion?: string;
  }): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.API_URL}/register`, datos);
  }

  guardarSesion(usuario: any): void {
    localStorage.setItem('sesion', 'true');
    localStorage.setItem('rol', usuario.rol);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('email', usuario.email);
    this.sesionIniciada.set(true);
    this.rolActual.set(usuario.rol);
  }

  logout(): void {
    localStorage.removeItem('sesion');
    localStorage.removeItem('rol');
    localStorage.removeItem('usuario');
    localStorage.removeItem('email');
    this.sesionIniciada.set(false);
    this.rolActual.set(null);
  }

  getUsuario(): any {
    const stored = localStorage.getItem('usuario');
    return stored ? JSON.parse(stored) : null;
  }

  getEmail(): string | null {
    return localStorage.getItem('email');
  }
}
