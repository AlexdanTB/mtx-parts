import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from '../models/pedido';

@Injectable({
  providedIn: 'root',
})
export class PedidosService {
  private API_PEDIDO = 'http://localhost:8080/pedidos';
  private http = inject(HttpClient);

  
  pedidos = signal<Pedido[]>([]);

  getPedidos(): Observable<any> {
    return this.http.get<any>(`${this.API_PEDIDO}`);
  }

  getPedidosPorUsuario(usuarioId: number): Observable<any> {
    return this.http.get<any>(`${this.API_PEDIDO}/usuario/${usuarioId}`);
  }

  postPedido(datos: {
    usuarioId: number;
    direccionEnvio: string;
    detalles: { productoId: number; cantidad: number }[]
  }): Observable<any> {
    return this.http.post<any>(`${this.API_PEDIDO}`, datos);
  }

  actualizarStatus(id: number, status: string): Observable<any> {
    return this.http.put<any>(`${this.API_PEDIDO}/${id}/status`, { status });
  }

  deletePedido(id: number): Observable<any> {
    return this.http.delete<any>(`${this.API_PEDIDO}/${id}`);
  }
}
