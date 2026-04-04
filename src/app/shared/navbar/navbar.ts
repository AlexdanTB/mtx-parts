import { Component } from '@angular/core';
import { Enlace } from '../../models/enlace';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule,RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

 enlaces: Enlace[] = [
    { titulo: 'Inicio', link: '/home' },
    { 
      titulo: 'Catálogo', 
      link: '/catalogo', 
      sub: [
        { titulo: 'Marcas', link: '/marcas' },
        { titulo: 'Motos', link: '/motos' },
        { titulo: 'Categorías', link: '/categorias' },
      ] 
    },
    { titulo: 'Nosotros', link: '/nosotros' },
    { titulo: 'Contacto', link: '/contacto' }
  ];

  isMenuOpen: boolean = false;
  isSubMenuOpen: boolean = false;

  // Cambia el estado del menú principal
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    // Si cierras el principal, cerramos el submenú por orden
    if (!this.isMenuOpen) {
      this.isSubMenuOpen = false;
    }
  }

  // Cambia el estado del submenú (el de "Catálogo")
  toggleSubMenu(): void {
    this.isSubMenuOpen = !this.isSubMenuOpen;
  }

  menuUsuarioAbierto = false;
  menuMovilAbierto = false;

  toggleMenuUsuario(): void {
    this.menuUsuarioAbierto = !this.menuUsuarioAbierto;
    this.menuMovilAbierto = false;
  }

  toggleMenuMovil(): void {
    this.menuMovilAbierto = !this.menuMovilAbierto;
    this.menuUsuarioAbierto = false;
  }
  isLoggedIn = true;

}
