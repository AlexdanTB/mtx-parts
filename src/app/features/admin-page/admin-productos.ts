import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProductoService } from '../../service/producto-service';
import { Producto } from '../../models/producto';
import { AuthService } from '../../service/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-productos',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './admin-productos.html',
  styleUrl: './admin-productos.css',
})
export class AdminProductos implements OnInit {
  private productoService = inject(ProductoService);
  private authService = inject(AuthService);
  private router = inject(Router);

  productos = signal<Producto[]>([]);
  loading = signal(true);
  showModal = signal(false);
  editingProducto = signal<Producto | null>(null);
  mensaje = signal<{ tipo: string; texto: string } | null>(null);

  productoForm: Producto = {
    sku: '',
    nombre: '',
    descripcion: '',
    precio: 0,
    stock: 0,
    imagenUrl: ''
  };

  ngOnInit(): void {
    if (this.authService.rolActual() !== 'ROLE_ADMIN') {
      this.router.navigate(['/']);
      return;
    }
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.productoService.getProductos().subscribe({
      next: (productos) => {
        this.productos.set(productos);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }

  abrirModal(producto?: Producto): void {
    if (producto) {
      this.editingProducto.set(producto);
      this.productoForm = { ...producto };
    } else {
      this.editingProducto.set(null);
      this.productoForm = {
        sku: '',
        nombre: '',
        descripcion: '',
        precio: 0,
        stock: 0,
        imagenUrl: ''
      };
    }
    this.showModal.set(true);
  }

  cerrarModal(): void {
    this.showModal.set(false);
    this.editingProducto.set(null);
  }

  guardarProducto(): void {
    if (this.editingProducto()) {
      this.productoService.actualizarProducto(this.productoForm.id!, this.productoForm).subscribe({
        next: () => {
          this.mostrarMensaje('Producto actualizado correctamente', 'success');
          this.cargarProductos();
          this.cerrarModal();
        },
        error: () => {
          this.mostrarMensaje('Error al actualizar el producto', 'error');
        }
      });
    } else {
      this.productoService.crearProducto(this.productoForm).subscribe({
        next: () => {
          this.mostrarMensaje('Producto creado correctamente', 'success');
          this.cargarProductos();
          this.cerrarModal();
        },
        error: () => {
          this.mostrarMensaje('Error al crear el producto', 'error');
        }
      });
    }
  }

  eliminarProducto(id: number): void {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      this.productoService.eliminarProducto(id).subscribe({
        next: () => {
          this.mostrarMensaje('Producto eliminado', 'success');
          this.cargarProductos();
        },
        error: () => {
          this.mostrarMensaje('Error al eliminar', 'error');
        }
      });
    }
  }

  private mostrarMensaje(texto: string, tipo: string): void {
    this.mensaje.set({ tipo, texto });
    setTimeout(() => this.mensaje.set(null), 3000);
  }

  formatPrice(precio: number): string {
    return precio.toLocaleString('es-EC', { style: 'currency', currency: 'USD' });
  }
}
