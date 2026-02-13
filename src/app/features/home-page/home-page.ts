import { Component } from '@angular/core';
import { CatGrids } from "../../shared/cat-grids/cat-grids";
import { ProductosGrid } from "../../shared/productos-grid/productos-grid";

@Component({
  selector: 'app-home-page',
  imports: [CatGrids, ProductosGrid],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {

}
