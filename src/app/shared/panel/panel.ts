import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsuariosService } from '../../service/usuarios-service';
import { AuthService } from '../../service/auth-service';
import { Router } from '@angular/router';
import { ProductosService } from '../../service/productos-service';
import { Producto } from '../../models/producto';
import { Usuarios } from '../../models/usuarios';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-panel',
  imports: [FormsModule, CommonModule],
  templateUrl: './panel.html',
  styleUrl: './panel.css',
})
export class Panel implements OnInit {

  private servicioProducto = inject(ProductosService);
  private servicioUsuarios = inject(UsuariosService);
  private servicioAuth = inject(AuthService);
  private router = inject(Router);


  vistaActual: 'repuestos' | 'usuarios' = 'repuestos';

  busqueda = signal('');

  usuarioActual = this.servicioUsuarios.usuarioAutenticado;


  repuestos = signal<Producto[]>([]);
  usuarios = signal<Usuarios[]>([]);

  ngOnInit(): void {
    this.cargarCatalogo();

    // Cargamos usuarios (puedes hacer lo mismo con usuarios si quieres quitar el any)
    this.servicioUsuarios.getUsuarios().subscribe(
      (data: Usuarios[]) => this.usuarios.set(Array.isArray(data) ? data : [])
    );
  }



  repuestosFiltrados = computed(() => {
    const q = this.busqueda().toLowerCase().trim();
    if (!q) return this.repuestos();
    return this.repuestos().filter(p =>
      p.nombre?.toLowerCase().includes(q) ||
      p.descripcion?.toLowerCase().includes(q) ||
      p.sku?.toLowerCase().includes(q) ||
      String(p.precio ?? '').includes(q)
    );
  });

  usuariosFiltrados = computed(() => {
    const q = this.busqueda().toLowerCase().trim();
    if (!q) return this.usuarios();
    return this.usuarios().filter(u =>
      u.name?.toLowerCase().includes(q) ||
      u.email?.toLowerCase().includes(q) ||
      u.phone?.toLowerCase().includes(q) ||
      u.address?.toLowerCase().includes(q)
    );
  });


  modalRepuestoAbierto = false;
  repuestoEditando: Producto | null = null;
  formRepuesto: Producto = this.productoVacio();

  productoVacio(): Producto {
    return {
      nombre: '',
      descripcion: '',
      sku: '',
      stock: 0,
      precio: 0,
      imagen_url: ''
    };
  }

  abrirModalRepuesto(): void {
    this.repuestoEditando = null;
    this.formRepuesto = this.productoVacio();
    this.modalRepuestoAbierto = true;
  }

  editarRepuesto(producto: Producto): void {
    this.repuestoEditando = producto;
    this.formRepuesto = { ...producto };
    this.modalRepuestoAbierto = true;
  }

  cerrarModalRepuesto(): void {
    this.modalRepuestoAbierto = false;
    this.repuestoEditando = null;
  }

  cargarCatalogo(): void {
    this.servicioProducto.getProducto().subscribe({
      next: (respuesta) => { 
        // Verificamos la estructura que manda tu Spring Boot
        if (respuesta && respuesta.data) {
          this.repuestos.set(respuesta.data);
        } else if (Array.isArray(respuesta)) {
          this.repuestos.set(respuesta);
        }
      },
      error: (err) => console.error('Error al cargar el catálogo:', err)
    });
  }

  guardarRepuesto(): void {
    if (this.repuestoEditando?.id) {
      this.servicioProducto.putProducto(this.repuestoEditando.id, this.formRepuesto).subscribe({
        next: () => {
          this.cargarCatalogo(); 
          this.cerrarModalRepuesto();
        },
        error: (err) => console.error('Error al actualizar:', err)
      });
    } else {
      this.servicioProducto.postProducto(this.formRepuesto).subscribe({
        next: (respuesta) => {
          this.cargarCatalogo(); 
          this.cerrarModalRepuesto();
          alert('Repuesto creado con éxito');
        },
        error: (err) => console.error('Error al crear:', err)
      });
    }
  }

  eliminarRepuesto(id: string): void {
    if (!confirm('¿Eliminar este producto?')) return;
    this.servicioProducto.deleteProducto(id).subscribe(() => {
      this.repuestos.update(lista => lista.filter(p => p.id !== id));
    });
  }

  modalUsuarioAbierto = false;
  usuarioEditando: Usuarios | null = null;
  formUsuario: Usuarios = this.usuarioVacio();
  mostrarContrasena = false;

  usuarioVacio(): Usuarios {
    return {
      name: '',
      email: '',
      password: '',
      imagen_url: '',
      phone: '',
      address: '',
      rol: 'ROLE_USUARIO'
    };
  }

  abrirModalUsuario(): void {
    this.usuarioEditando = null;
    this.formUsuario = this.usuarioVacio();
    this.modalUsuarioAbierto = true;
  }

  editarUsuario(usuario: Usuarios): void {
    this.usuarioEditando = usuario;
    this.formUsuario = { ...usuario, password: '' };
    this.modalUsuarioAbierto = true;
  }

  cerrarModalUsuario(): void {
    this.modalUsuarioAbierto = false;
    this.usuarioEditando = null;
  }

  guardarUsuario(): void {
    if (this.usuarioEditando?.id) {
      this.servicioUsuarios.putUsuario(this.usuarioEditando.id, this.formUsuario).subscribe(() => {
        this.usuarios.update(lista =>
          lista.map(u => u.id === this.usuarioEditando!.id ? { ...this.formUsuario, id: this.usuarioEditando!.id } : u)
        );
        this.cerrarModalUsuario();
      });
    } else {
      this.servicioUsuarios.postUsuario(this.formUsuario).subscribe(nuevo => {
        this.usuarios.update(lista => [...lista, nuevo]);
        this.cerrarModalUsuario();
      });
    }
  }

  eliminarUsuario(id: string): void {
    if (!confirm('¿Eliminar este usuario?')) return;
    this.servicioUsuarios.deleteUsuario(id).subscribe(() => {
      this.usuarios.update(lista => lista.filter(u => u.id !== id));
    });
  }

  cerrarSesion(): void {
    this.servicioAuth.logout();
    this.router.navigate(['/']);
  }


}
