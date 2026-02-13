import { Component } from '@angular/core';
import { ProductoCard } from "../producto-card/producto-card";

@Component({
  selector: 'app-productos-grid',
  imports: [ProductoCard],
  templateUrl: './productos-grid.html',
  styleUrl: './productos-grid.css',
})
export class ProductosGrid {

}
