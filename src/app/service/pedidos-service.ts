import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from '../models/pedido';

@Injectable({
  providedIn: 'root',
})
export class PedidosService {
  private readonly API_URL = 'https://projectmtx-68218-default-rtdb.firebaseio.com/pedidos';
  private http = inject(HttpClient);

  pedidos = signal<Pedido[]>([]);

  getPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.API_URL}.json`);
  }

  getPedidosPorUsuario(idUsuario: string): Observable<Pedido[]> {
    return new Observable(observer => {
      this.getPedidos().subscribe({
        next: (pedidos) => {
          const pedidosUsuario = pedidos.filter(p => p.idUsuario === idUsuario);
          this.pedidos.set(pedidosUsuario);
          observer.next(pedidosUsuario);
        },
        error: (err) => observer.error(err)
      });
    });
  }

  postPedido(pedido: Pedido): Observable<{ name: string }> {
    return this.http.post<{ name: string }>(`${this.API_URL}.json`, pedido);
  }

  putPedido(id: string, pedido: Pedido): Observable<Pedido> {
    return this.http.put<Pedido>(`${this.API_URL}/${id}.json`, pedido);
  }

  deletePedido(id: string): Observable<null> {
    return this.http.delete<null>(`${this.API_URL}/${id}.json`);
  }
}
