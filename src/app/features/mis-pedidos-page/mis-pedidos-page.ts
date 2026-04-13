import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PedidosService } from '../../service/pedidos-service';
import { PedidoResponse } from '../../models/pedido';
import { AuthService } from '../../service/auth-service';
import { UsuariosService } from '../../service/usuarios-service';

@Component({
  selector: 'app-mis-pedidos-page',
  imports: [CommonModule],
  templateUrl: './mis-pedidos-page.html',
  styleUrl: './mis-pedidos-page.css',
})
export class MisPedidosPage implements OnInit {
  private pedidosService = inject(PedidosService);
  private authService = inject(AuthService);
  private usuariosService = inject(UsuariosService);
  private router = inject(Router);

  pedidos: PedidoResponse[] = [];
  loading = true;
  pedidoExpandido: number | null = null;

  ngOnInit(): void {
    if (!this.authService.sesionIniciada()) {
      this.router.navigate(['/login']);
      return;
    }

    this.pedidosService.getPedidos().subscribe({
      next: (pedidos) => {
        const usuario = this.usuariosService.usuarioAutenticado();
        const rol = this.authService.rolActual();

        if (rol === 'ROLE_ADMIN') {
          this.pedidos = pedidos.sort((a, b) =>
            new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
          );
        } else {
          this.pedidos = pedidos
            .filter(p => p.usuarioId === usuario?.id)
            .sort((a, b) =>
              new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
            );
        }
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  toggleDetalle(id: number): void {
    this.pedidoExpandido = this.pedidoExpandido === id ? null : id;
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
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  formatPrice(precio: number): string {
    return precio.toLocaleString('es-EC', { style: 'currency', currency: 'USD' });
  }
}
