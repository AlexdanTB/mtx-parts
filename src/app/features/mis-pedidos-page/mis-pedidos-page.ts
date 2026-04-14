import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { PedidosService } from '../../service/pedidos-service';
import { AuthService } from '../../service/auth-service';
import { UsuariosService } from '../../service/usuarios-service';

@Component({
  selector: 'app-mis-pedidos-page',
  imports: [CommonModule,RouterLink],
  templateUrl: './mis-pedidos-page.html',
  styleUrl: './mis-pedidos-page.css',
})
export class MisPedidosPage implements OnInit {
  
  private pedidosService = inject(PedidosService);
  private authService = inject(AuthService);
  private usuariosService = inject(UsuariosService);
  private router = inject(Router);

  pedidos: any[] = [];
  loading = true;
  pedidoExpandido: string | null = null;

  ngOnInit(): void {
    if (!this.authService.sesionIniciada()) {
      this.router.navigate(['/login']);
      return;
    }

    const usuario = this.usuariosService.usuarioAutenticado();
    if (usuario?.id) {
      this.pedidosService.getPedidosPorUsuario(Number(usuario.id)).subscribe({
        next: (respuesta: any) => {
          if (respuesta?.data && Array.isArray(respuesta.data)) {
            this.pedidos = respuesta.data;
          } else if (Array.isArray(respuesta)) {
            this.pedidos = respuesta;
          }
          this.loading = false;
        },
        error: (err) => {
          console.error('Error al cargar pedidos:', err);
          this.loading = false;
        }
      });
    } else {
      this.loading = false;
    }
  }

  toggleDetalle(id: any): void {
  const idStr = String(id);
  this.pedidoExpandido = this.pedidoExpandido === idStr ? null : idStr;
}

  getEstadoClase(estado: string): string {
    const estados: { [key: string]: string } = {
      pendiente: 'bg-yellow-100 text-yellow-700',
      procesando: 'bg-blue-100 text-blue-700',
      enviado: 'bg-purple-100 text-purple-700',
      entregado: 'bg-green-100 text-green-700',
      cancelado: 'bg-red-100 text-red-700'
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
