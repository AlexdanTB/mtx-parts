import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth-service';
import { CarritoService } from '../../service/carrito-service';
import { ProductosService } from '../../service/productos-service';
import { Producto } from '../../models/producto';

@Component({
  selector: 'app-faceted-search',
  imports: [],
  templateUrl: './faceted-search.html',
  styleUrl: './faceted-search.css',
})
export class FacetedSearch {

  categorias = ['Motor', 'Frenos', 'Llantas', 'Suspensión', 'Transmisión', 'Accesorios', 'Lubricantes'];
  marcas = ['Honda', 'Yamaha', 'Suzuki', 'KTM', 'Kawasaki', 'Shineray', 'Pirelli', 'Michelin', 'NGK'];

  private authService = inject(AuthService);
  private carritoService = inject(CarritoService);
  private router = inject(Router);
  private servicioProductos = inject(ProductosService);


  // Señales (Signals)
  logueado = this.authService.sesionIniciada;
  repuestos = signal<Producto[]>([]);

  // Computed para el filtrado 
  repuestosFiltrados = computed(() => {
    return this.repuestos();
  });

  ngOnInit(): void {
    this.cargarCatalogo();
  }

  cargarCatalogo(): void {
    this.servicioProductos.getProducto().subscribe({
      next: (respuesta: { success: boolean; data: Producto[] }) => {

        if (respuesta.success && respuesta.data) {
          this.repuestos.set(respuesta.data);
        }
      }
    });
  }

  agregarAlCarrito(producto: Producto): void {
    if (!this.authService.sesionIniciada()) {
      alert('Debes iniciar sesión para comprar');
      this.router.navigate(['/login']);
      return;
    }

    this.carritoService.agregarItem({
      idProducto: producto.id!,
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad: 1,
      imagen: producto.imagen_url,
      marca: this.marcas[0],
      //categoria: this.categorias[0]
    });

    alert(`${producto.nombre} agregado al carrito`);
  }

}
