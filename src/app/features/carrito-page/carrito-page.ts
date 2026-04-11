import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CarritoService } from '../../service/carrito-service';
import { PedidosService } from '../../service/pedidos-service';
import { AuthService } from '../../service/auth-service';
import { UsuariosService } from '../../service/usuarios-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-carrito-page',
  imports: [CommonModule, FormsModule],
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

  direccionEnvio = signal('');

  actualizarCantidad(idProducto: number, event: Event): void {
    const input = event.target as HTMLInputElement;
    const cantidad = parseInt(input.value, 10);
    this.carritoService.actualizarCantidad(String(idProducto), cantidad);
  }

  eliminarItem(idProducto: number): void {
    this.carritoService.eliminarItem(String(idProducto));
  }

  vaciarCarrito(): void {
    this.carritoService.vaciarCarrito();
  }

  confirmarPedido(): void {
    if (!this.authService.sesionIniciada()) {
      alert('Debes iniciar sesión para realizar un pedido');
      this.router.navigate(['/login']);
      return;
    }

    if (!this.direccionEnvio()) {
      alert('Por favor ingresa la dirección de envío');
      return;
    }

    const detalles = this.items().map(item => ({
      productoId: Number(item.idProducto),
      cantidad: item.cantidad
    }));

    const pedido = {
      detalles,
      direccionEnvio: this.direccionEnvio()
    };

    this.pedidosService.crearPedido(pedido).subscribe({
      next: () => {
        this.carritoService.vaciarCarrito();
        this.direccionEnvio.set('');
        alert('¡Pedido realizado con éxito!');
        this.router.navigate(['/mis-pedidos']);
      },
      error: (err) => {
        alert('Error al procesar el pedido. Intenta nuevamente.');
        console.error(err);
      }
    });
  }

  formatPrice(precio: number): string {
    return precio.toLocaleString('es-EC', { style: 'currency', currency: 'USD' });
  }
}
