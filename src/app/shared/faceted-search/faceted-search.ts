import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth-service';
import { CarritoService } from '../../service/carrito-service';

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

  logueado = this.authService.sesionIniciada;

  productosDemo = [
    { id: '1', nombre: 'Kit de Pastillas de Freno Sinterizadas', marca: 'Honda', categoria: 'Frenos', precio: 45.00, imagen: 'https://i.pinimg.com/1200x/6a/18/46/6a18462f3b425e0e6273dd6eef0a5d33.jpg' },
    { id: '2', nombre: 'Filtro de Aceite Deportivo', marca: 'Yamaha', categoria: 'Motor', precio: 25.00, imagen: 'https://i.pinimg.com/1200x/6a/18/46/6a18462f3b425e0e6273dd6eef0a5d33.jpg' },
    { id: '3', nombre: 'Cadena de Transmisión 428', marca: 'Suzuki', categoria: 'Transmisión', precio: 65.00, imagen: 'https://i.pinimg.com/1200x/6a/18/46/6a18462f3b425e0e6273dd6eef0a5d33.jpg' },
    { id: '4', nombre: 'Pastillas de Freno Delanteras', marca: 'KTM', categoria: 'Frenos', precio: 35.00, imagen: 'https://i.pinimg.com/1200x/6a/18/46/6a18462f3b425e0e6273dd6eef0a5d33.jpg' },
    { id: '5', nombre: 'Amortiguador Deportivo', marca: 'Kawasaki', categoria: 'Suspensión', precio: 120.00, imagen: 'https://i.pinimg.com/1200x/6a/18/46/6a18462f3b425e0e6273dd6eef0a5d33.jpg' },
    { id: '6', nombre: 'Llanta Trasera 17"', marca: 'Pirelli', categoria: 'Llantas', precio: 85.00, imagen: 'https://i.pinimg.com/1200x/6a/18/46/6a18462f3b425e0e6273dd6eef0a5d33.jpg' },
  ];

  agregarAlCarrito(producto: any): void {
    if (!this.authService.sesionIniciada()) {
      this.router.navigate(['/login']);
      return;
    }

    this.carritoService.agregarItem({
      idProducto: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad: 1,
      imagen: producto.imagen,
      marca: producto.marca
    });

    alert(`${producto.nombre} agregado al carrito`);
  }

}
