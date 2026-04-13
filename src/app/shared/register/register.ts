import { Component, inject, signal } from '@angular/core';
import { UsuariosService } from '../../service/usuarios-service';
import { Router, RouterLink } from '@angular/router';
import { Usuarios } from '../../models/usuarios';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [FormsModule,RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
private servicioUsuarios = inject(UsuariosService);
  private router = inject(Router);

  //LISTA REACTIVA
  listaUsuarios = signal<Usuarios[]>([]);

  //Objeto para vincular con el formulario
  guardarUsuario: Usuarios = {
    name: '',
    email: '',
    password: '',
    imagen_url: '',
    phone: '',
    address: '',
    rol: 'ROLE_USUARIO'
  }

  registrarUsuario() {
    this.servicioUsuarios.postUsuario(this.guardarUsuario).subscribe(() => {
      alert('Usuario registrado correctamente');
      this.router.navigate(['/login'])
      this.limpiarFormulario();
      
    }, error => {
      alert('Error al registrar el usuario');
      console.error(error);
    });
  }


  limpiarFormulario() {
    this.guardarUsuario = {
      name: '',
      email: '',
      password: '',
      imagen_url: '',
      phone: '',
      address: '',
      rol: 'ROLE_USUARIO'
    }
  }
}
