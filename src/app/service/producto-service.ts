import { inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private readonly API_URL = 'http://localhost:8080/productos';
  private http = inject(HttpClient);

  productos = signal<Producto[]>([]);
  productoActual = signal<Producto | null>(null);

  getProductos(nombre?: string, disponibles?: boolean): Observable<Producto[]> {
    let url = this.API_URL;
    const params: string[] = [];
    if (nombre) params.push(`nombre=${nombre}`);
    if (disponibles !== undefined) params.push(`disponibles=${disponibles}`);
    if (params.length > 0) url += '?' + params.join('&');
    
    return this.http.get<Producto[]>(url).pipe(
      map(data => {
        this.productos.set(data);
        return data;
      }),
      catchError(this.handleError)
    );
  }

  getProductoPorId(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.API_URL}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  getProductoPorSku(sku: string): Observable<Producto> {
    return this.http.get<Producto>(`${this.API_URL}/sku/${sku}`).pipe(
      catchError(this.handleError)
    );
  }

  crearProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.API_URL, producto).pipe(
      catchError(this.handleError)
    );
  }

  actualizarProducto(id: number, producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.API_URL}/${id}`, producto).pipe(
      catchError(this.handleError)
    );
  }

  eliminarProducto(id: number): Observable<void> {
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
      mensaje = 'Producto no encontrado';
    }
    return throwError(() => new Error(mensaje));
  }
}
