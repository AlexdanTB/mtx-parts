import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CarritoService } from '../../service/carrito-service';
import { PedidosService } from '../../service/pedidos-service';
import { AuthService } from '../../service/auth-service';
import { UsuariosService } from '../../service/usuarios-service';

@Component({
  selector: 'app-carrito-page',
  imports: [CommonModule],
  templateUrl: './carrito-page.html',
  styleUrl: './carrito-page.css',
})
export class CarritoPage {
  private carritoService = inject(CarritoService);
  private pedidosService = inject(PedidosService);
  private authService = inject(AuthService);
  private usuariosService = inject(UsuariosService);
  private router = inject(Router);

  items = this.carritoService.items;
  cantidadTotal = this.carritoService.cantidadTotal;
  totalCarrito = this.carritoService.totalCarrito;

  actualizarCantidad(idProducto: string, event: Event): void {
    const input = event.target as HTMLInputElement;
    const cantidad = parseInt(input.value, 10);
    this.carritoService.actualizarCantidad(idProducto, cantidad);
  }

  eliminarItem(idProducto: string): void {
    this.carritoService.eliminarItem(idProducto);
  }

  vaciarCarrito(): void {
    this.carritoService.vaciarCarrito();
  }

  generarNumeroPedido(): string {
    return 'PED-' + Date.now().toString(36).toUpperCase();
  }

  confirmarPedido(): void {
    if (!this.authService.sesionIniciada()) {
      alert('Debes iniciar sesión para realizar un pedido');
      this.router.navigate(['/login']);
      return;
    }

    const usuario = this.usuariosService.usuarioAutenticado();
    if (!usuario) {
      alert('No se pudo obtener la información del usuario');
      return;
    }

    const pedido = {
      idUsuario: usuario.id || '',
      nombreUsuario: usuario.nombre,
      correoUsuario: usuario.correo,
      items: this.items(),
      total: this.totalCarrito(),
      estado: 'pendiente' as const,
      fecha: new Date().toISOString(),
      direccion: '',
      telefono: ''
    };

    this.pedidosService.postPedido(pedido).subscribe({
      next: () => {
        this.carritoService.vaciarCarrito();
        alert('¡Pedido realizado con éxito!');
        this.router.navigate(['/mis-pedidos']);
      },
      error: () => {
        alert('Error al procesar el pedido. Intenta nuevamente.');
      }
    });
  }

  formatPrice(precio: number): string {
    return precio.toLocaleString('es-EC', { style: 'currency', currency: 'USD' });
  }
}
