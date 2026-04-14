import { Component } from '@angular/core';
import { Enlace } from '../../models/enlace';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {

  enlaces: Enlace[] = [
    {titulo:"Inicio", link:"/"},
    {titulo:"Catálogo", link:"/repuestos"},
    {titulo:"Nosotros", link:"/nosotros"},
    {titulo:"Contacto", link:"/contacto"},
  ]

}
