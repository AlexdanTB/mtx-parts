import { Component } from '@angular/core';
import { CarouselNosotros } from "../../shared/carousel-nosotros/carousel-nosotros";
import { Stats } from "../../shared/stats/stats";

@Component({
  selector: 'app-nosotros-page',
  imports: [CarouselNosotros, Stats],
  templateUrl: './nosotros-page.html',
  styleUrl: './nosotros-page.css',
})
export class NosotrosPage {

}
