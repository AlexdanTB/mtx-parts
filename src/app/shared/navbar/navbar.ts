import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { Enlace } from '../../models/enlace';
import { AuthService } from '../../service/auth-service';
import { UsuariosService } from '../../service/usuarios-service';
import { CarritoService } from '../../service/carrito-service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

  enlaces: Enlace[] = [
    { titulo: 'Inicio', link: '/' },
    { titulo: 'Repuestos', link: '/repuestos' },
    { titulo: 'Nosotros', link: '/nosotros' },
    { titulo: 'Contacto', link: '/contacto' },
  ];

  isMenuOpen = false;
  openSubMenuIndex: number | null = null;
  menuUsuarioAbierto = false;

  busqueda = '';
  buscadorMovilAbierto = false;

  isLoggedIn = true;

  usuario = {
    nombre: 'Anderson',
    email: 'estudiante@istqmet.edu.ec',
  };


  constructor(private router: Router) { }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    if (!this.isMenuOpen) this.openSubMenuIndex = null;
  }

  toggleSubMenu(index: number): void {
    this.openSubMenuIndex = this.openSubMenuIndex === index ? null : index;
  }

  cerrarMenu(): void {
    this.isMenuOpen = false;
    this.openSubMenuIndex = null;
  }

  toggleBuscadorMovil(): void {
    this.buscadorMovilAbierto = !this.buscadorMovilAbierto;
  }

  buscar(): void {
    const termino = this.busqueda.trim();
    if (termino) {
      this.router.navigate(['/buscar'], { queryParams: { q: termino } });
      this.buscadorMovilAbierto = false;
    }
  }

  private servicioUsuarios = inject(UsuariosService);
  private servicioAuth = inject(AuthService);
  private carritoService = inject(CarritoService);

  usuarioActual = computed(() => this.servicioUsuarios.usuarioAutenticado());
  cantidadCarrito = computed(() => this.carritoService.cantidadTotal());
  
  logout(): void {
    this.servicioAuth.logout();
    this.router.navigate(['/']);
  }

}