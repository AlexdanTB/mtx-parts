import { inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Pedido, PedidoResponse } from '../models/pedido';

@Injectable({
  providedIn: 'root',
})
export class PedidosService {
  private readonly API_URL = 'http://localhost:8080/pedidos';
  private http = inject(HttpClient);

  pedidos = signal<PedidoResponse[]>([]);

  getPedidos(): Observable<PedidoResponse[]> {
    return this.http.get<PedidoResponse[]>(this.API_URL).pipe(
      map((data: PedidoResponse[]) => {
        this.pedidos.set(data);
        return data;
      }),
      catchError(this.handleError)
    );
  }

  getPedidoPorId(id: number): Observable<PedidoResponse> {
    return this.http.get<PedidoResponse>(`${this.API_URL}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  getPedidosPorStatus(status: string): Observable<PedidoResponse[]> {
    return this.http.get<PedidoResponse[]>(`${this.API_URL}/status/${status}`).pipe(
      catchError(this.handleError)
    );
  }

  crearPedido(pedido: {
    detalles: { productoId: number; cantidad: number }[];
    direccionEnvio: string;
  }): Observable<PedidoResponse> {
    return this.http.post<PedidoResponse>(this.API_URL, pedido).pipe(
      catchError(this.handleError)
    );
  }

  actualizarEstadoPedido(id: number, estado: string): Observable<PedidoResponse> {
    return this.http.put<PedidoResponse>(`${this.API_URL}/${id}/status`, null, {
      params: { status: estado }
    }).pipe(
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
      mensaje = 'Pedido no encontrado';
    }
    return throwError(() => new Error(mensaje));
  }
}
