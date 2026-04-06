import { Component } from '@angular/core';

@Component({
  selector: 'app-faceted-search',
  imports: [],
  templateUrl: './faceted-search.html',
  styleUrl: './faceted-search.css',
})
export class FacetedSearch {
  categorias = ['Motor', 'Frenos', 'Llantas', 'Suspensión', 'Transmisión', 'Accesorios', 'Lubricantes'];
  marcas = ['Honda', 'Yamaha', 'Suzuki', 'KTM', 'Kawasaki', 'Shineray', 'Pirelli', 'Michelin', 'NGK'];

}
