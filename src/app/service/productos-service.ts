import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Producto } from '../models/producto';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  
  private http = inject(HttpClient);
  private API_PRODUCTOS = 'http://localhost:8080/productos';

  // Obtener todos los productos 
  getProducto(): Observable<{ success: boolean; data: Producto[] }> {
    return this.http.get<{ success: boolean; data: Producto[] }>(this.API_PRODUCTOS);
  }
  
  // Obtener un producto por ID
  getProductoById(id: number | string): Observable<{ success: boolean; data: Producto }> {
    return this.http.get<{ success: boolean; data: Producto }>(`${this.API_PRODUCTOS}/${id}`);
  }

  // Crear un nuevo producto
  postProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.API_PRODUCTOS, producto);
  }

  // Actualizar un producto
  putProducto(id: number | string, producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.API_PRODUCTOS}/${id}`, producto);
  }

  // Eliminar un producto
  deleteProducto(id: number | string): Observable<void> {
    return this.http.delete<void>(`${this.API_PRODUCTOS}/${id}`);
  }

}
