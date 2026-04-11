import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PedidosService } from '../../service/pedidos-service';
import { PedidoResponse } from '../../models/pedido';
import { AuthService } from '../../service/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-pedidos',
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-pedidos.html',
  styleUrl: './admin-pedidos.css',
})
export class AdminPedidos implements OnInit {
  private pedidosService = inject(PedidosService);
  private authService = inject(AuthService);
  private router = inject(Router);

  pedidos = signal<PedidoResponse[]>([]);
  loading = signal(true);
  pedidoExpandido = signal<number | null>(null);
  mensaje = signal<{ tipo: string; texto: string } | null>(null);

  estados = ['PENDIENTE', 'PAGADO', 'ENTREGADO', 'ANULADO'];

  ngOnInit(): void {
    if (this.authService.rolActual() !== 'ROLE_ADMIN') {
      this.router.navigate(['/']);
      return;
    }
    this.cargarPedidos();
  }

  cargarPedidos(): void {
    this.pedidosService.getPedidos().subscribe({
      next: (pedidos) => {
        this.pedidos.set(pedidos.sort((a, b) =>
          new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
        ));
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }

  toggleDetalle(id: number): void {
    this.pedidoExpandido.set(this.pedidoExpandido() === id ? null : id);
  }

  cambiarEstado(pedido: PedidoResponse, nuevoEstado: string): void {
    this.pedidosService.actualizarEstadoPedido(pedido.id, nuevoEstado).subscribe({
      next: () => {
        this.mostrarMensaje(`Estado actualizado a ${nuevoEstado}`, 'success');
        this.cargarPedidos();
      },
      error: () => {
        this.mostrarMensaje('Error al actualizar estado', 'error');
      }
    });
  }

  private mostrarMensaje(texto: string, tipo: string): void {
    this.mensaje.set({ tipo, texto });
    setTimeout(() => this.mensaje.set(null), 3000);
  }

  getEstadoClase(estado: string): string {
    const estados: { [key: string]: string } = {
      'PENDIENTE': 'bg-yellow-100 text-yellow-700',
      'PAGADO': 'bg-blue-100 text-blue-700',
      'ENTREGADO': 'bg-green-100 text-green-700',
      'ANULADO': 'bg-red-100 text-red-700'
    };
    return estados[estado] || 'bg-gray-100 text-gray-700';
  }

  formatDate(fecha: string): string {
    return new Date(fecha).toLocaleDateString('es-EC', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  formatPrice(precio: number): string {
    return precio.toLocaleString('es-EC', { style: 'currency', currency: 'USD' });
  }
}
