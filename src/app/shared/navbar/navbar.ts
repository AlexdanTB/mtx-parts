import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Enlace } from '../../models/enlace';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

  enlaces: Enlace[] = [
    { titulo: 'Inicio', link: '' },
    {
      titulo: 'Catálogo',
      link: '/catalogo',
      sub: [
        { titulo: 'Motores',     link: '/catalogo/deportivas' },
        { titulo: 'Estético', link: '/catalogo/naked' },
        { titulo: 'Sistema Eléctrico ', link: '/catalogo/enduro' },
        { titulo: 'Scooters',       link: '/catalogo/scooters' },
        { titulo: 'Por Marca',      link: '/marcas' },
      ]
    },
    { titulo: 'Nosotros', link: '/nosotros' },
    { titulo: 'Contacto', link: '/contacto' },
  ];

  // Menú móvil principal
  isMenuOpen = false;

  
  openSubMenuIndex: number | null = null;

  // Menú de usuario (desktop hover)
  menuUsuarioAbierto = false;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    if (!this.isMenuOpen) {
      this.openSubMenuIndex = null; 
    }
  }

  toggleSubMenu(index: number): void {
    this.openSubMenuIndex = this.openSubMenuIndex === index ? null : index;
  }

  cerrarMenu(): void {
    this.isMenuOpen = false;
    this.openSubMenuIndex = null;
  }

  isLoggedIn = true;

  // Datos del usuario (en el futuro vendrán de un servicio/AuthService)
  usuario = {
    nombre: 'Anderson',
    email: 'estudiante@istqmet.edu.ec',
  };

  cantidadCarrito = 2;
}