import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  email: string = '';
  password: string = '';
  mostrarPassword: boolean = false;
  errorMessage: string = '';
  loading = false;

  private authService = inject(AuthService);
  private router = inject(Router);

  iniciarSesion() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Por favor complete todos los campos';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        if (response.success) {
          this.authService.guardarSesion(response.data);
          alert('Bienvenido al Sistema');
          this.router.navigate(['/']);
        } else {
          this.errorMessage = response.message || 'Credenciales incorrectas';
        }
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = 'Error al iniciar sesión. Verifique sus credenciales.';
        console.error(err);
      }
    });
  }
}
