import { Component } from '@angular/core';
import { CatGrids } from "../../shared/cat-grids/cat-grids";
import { HeroInicio } from "../../shared/hero-inicio/hero-inicio";
import { TopInicio } from "../../shared/top-inicio/top-inicio";
import { ProductoCard } from "../../shared/producto-card/producto-card";
import { SliderMarcas } from "../../shared/slider-marcas/slider-marcas";

@Component({
  selector: 'app-home-page',
  imports: [CatGrids, ProductoCard, HeroInicio, TopInicio, SliderMarcas],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {

}
