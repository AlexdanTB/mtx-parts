import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from '../models/pedido';

@Injectable({
  providedIn: 'root',
})
export class PedidosService {
  private readonly API_PEDIDO = 'http://localhost:8080/pedidos';
  private http = inject(HttpClient);
// Mantenemos tus señales
  sesionIniciada = signal<boolean>(localStorage.getItem('sesion') === 'true');
  pedidos = signal<Pedido[]>([]);

  // 1. Obtener todos (Solo si eres ADMIN, si no, te dará 405 si no tienes GetMapping en Java)
  getPedidos(): Observable<any> {
    return this.http.get<any>(`${this.API_PEDIDO}`);
  }

  // 🟢 2. CORREGIDO: Llamada directa al endpoint del usuario
  getPedidosPorUsuario(idUsuario: string | number): Observable<any> {
    return this.http.get<any>(`${this.API_PEDIDO}/usuario/${idUsuario}`);
  }

  // 🟢 3. POST: Para guardar el carrito
  postPedido(pedido: Pedido): Observable<any> {
    return this.http.post<any>(`${this.API_PEDIDO}`, pedido);
  }

  putPedido(id: string, pedido: Pedido): Observable<Pedido> {
    return this.http.put<Pedido>(`${this.API_PEDIDO}/${id}`, pedido);
  }

  deletePedido(id: string): Observable<null> {
    return this.http.delete<null>(`${this.API_PEDIDO}/${id}`);
  }
}
