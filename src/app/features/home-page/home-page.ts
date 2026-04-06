import { Component } from '@angular/core';
import { CatGrids } from "../../shared/cat-grids/cat-grids";
import { ProductosGrid } from "../../shared/productos-grid/productos-grid";
import { HeroInicio } from "../../shared/hero-inicio/hero-inicio";
import { TopInicio } from "../../shared/top-inicio/top-inicio";

@Component({
  selector: 'app-home-page',
  imports: [CatGrids, ProductosGrid, HeroInicio, TopInicio],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {

}
