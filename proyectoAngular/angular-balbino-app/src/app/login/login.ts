import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: any; // Declaramos el formulario sin inicializar

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // Inicializamos el formulario en el constructor
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return; // Si el formulario no es válido, no continuar
    }

    const { email, password } = this.loginForm.value;

    // Verificación adicional por si acaso
    if (!email || !password) {
      alert('Por favor, complete todos los campos');
      return;
    }

    this.authService.login({ email, password }).subscribe({
      next: (response: any) => {
        // Asumimos que el servicio retorna un objeto con user o token
        if (response?.user || response?.token) {
          this.router.navigate(['/']); // Redirigir al home
        } else {
          alert('Credenciales incorrectas');
        }
      },
      error: (error) => {
        console.error('Error en el login:', error);
        alert('Error en el login. Intenta nuevamente.');
      }
    });
  }
}