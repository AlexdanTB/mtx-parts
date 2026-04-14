import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CarritoService } from '../../service/carrito-service';
import { PedidosService } from '../../service/pedidos-service';
import { AuthService } from '../../service/auth-service';
import { UsuariosService } from '../../service/usuarios-service';
import { Pedido } from '../../models/pedido';

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

  actualizarCantidad(idProducto: string, nuevaCantidad: number): void {
    if (nuevaCantidad < 1) return;
    this.carritoService.actualizarCantidad(idProducto, nuevaCantidad);
  }

  cambiarCantidadDesdeInput(idProducto: string, event: Event): void {
    const input = event.target as HTMLInputElement;
    const cantidad = parseInt(input.value, 10);

    if (!isNaN(cantidad) && cantidad >= 1) {
      this.actualizarCantidad(idProducto, cantidad);
    }
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
  const usuario = this.usuariosService.usuarioAutenticado();
  if (!usuario || !usuario.id) {
    alert('Debes iniciar sesión para realizar un pedido');
    return;
  }

  if (this.items().length === 0) {
    alert('El carrito está vacío');
    return;
  }

  const body = {
    usuarioId: Number(usuario.id),
    direccionEnvio: usuario.address || 'Quito',
    detalles: this.items().map(item => ({
      productoId: Number(item.idProducto),
      cantidad: Number(item.cantidad)
    }))
  };

  this.pedidosService.postPedido(body).subscribe({
    next: (res) => {
      this.carritoService.vaciarCarrito();
      alert('¡Pedido realizado con éxito!');
      this.router.navigate(['/mis-pedidos']);
    },
    error: (err) => {
      // Muestra el mensaje real del backend
      const mensaje = err.error?.message
        || 'Error al procesar el pedido. Intenta de nuevo.';
      alert(mensaje);
      console.error('Error pedido:', err);
    }
  });
}

  formatPrice(precio: number): string {
    return precio.toLocaleString('es-EC', { style: 'currency', currency: 'USD' });
  }
}
