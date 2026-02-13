import { Component } from '@angular/core';
import { Enlace } from '../../models/enlace';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {

  enlaces: Enlace[] = [
    {titulo:"Inicio", link:""},
    {titulo:"Catálogo", link:""},
    {titulo:"Nosotros", link:""},
    {titulo:"Contacto", link:""},
  ]

}
