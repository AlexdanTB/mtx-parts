import { Component } from '@angular/core';
import { Enlace } from '../../models/enlace';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

  enlaces: Enlace[] = [
    {titulo: 'Inicio', link:''},
    {titulo: 'Catálogo', link:'', sub:[
      {titulo:'Marcas', link:''},
      {titulo:'Motos', link:''},
      {titulo:'Categoría', link:''},
    ]},
    {titulo: 'Nosotros', link:''},
    {titulo: 'Contacto', link:''}
  ]

  isMenuOpen: boolean = false;
  isSubMenuOpen: boolean = false;

  toggleSubMenu():void{
    this.isSubMenuOpen = !this.isMenuOpen;
  }

}
