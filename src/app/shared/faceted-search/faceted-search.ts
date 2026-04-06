import { Component, inject } from '@angular/core';
import { AuthService } from '../../service/auth-service';

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
  logueado = this.authService.sesionIniciada;

  mensaje() {
    alert('Debes iniciar sesión para agregar al carrito');
  }

}
