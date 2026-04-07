import { Component } from '@angular/core';
import { FacetedSearch } from "../../shared/faceted-search/faceted-search";
import { Stats } from "../../shared/stats/stats";

@Component({
  selector: 'app-productos-page',
  imports: [FacetedSearch, Stats],
  templateUrl: './productos-page.html',
  styleUrl: './productos-page.css',
})
export class ProductosPage {

}
