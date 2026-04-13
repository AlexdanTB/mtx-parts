import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductoService } from '../../service/producto-service';
import { PedidosService } from '../../service/pedidos-service';
import { UsuariosService } from '../../service/usuarios-service';
import { AuthService } from '../../service/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-page',
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-page.html',
  styleUrl: './admin-page.css',
})
export class AdminPage implements OnInit {
  private productoService = inject(ProductoService);
  private pedidosService = inject(PedidosService);
  private usuariosService = inject(UsuariosService);
  private authService = inject(AuthService);
  private router = inject(Router);

  loading = signal(true);
  totalProductos = signal(0);
  totalPedidos = signal(0);
  totalUsuarios = signal(0);
  pedidosPendientes = signal(0);

  ngOnInit(): void {
    if (this.authService.rolActual() !== 'ROLE_ADMIN') {
      this.router.navigate(['/']);
      return;
    }

    this.cargarDatos();
  }

  cargarDatos(): void {
    this.productoService.getProductos().subscribe({
      next: (productos) => {
        this.totalProductos.set(productos.length);
      }
    });

    this.pedidosService.getPedidos().subscribe({
      next: (pedidos) => {
        this.totalPedidos.set(pedidos.length);
        this.pedidosPendientes.set(pedidos.filter(p => p.estado === 'PENDIENTE').length);
      }
    });

    this.usuariosService.getUsuarios().subscribe({
      next: (usuarios) => {
        this.totalUsuarios.set(usuarios.length);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }
}
