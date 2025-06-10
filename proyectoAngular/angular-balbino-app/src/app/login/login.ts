import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms'; 
import { AuthService } from '../auth';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true, 
  imports: [ReactiveFormsModule, CommonModule, RouterModule], 
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

onSubmit() {
  if (this.loginForm.invalid) {
    this.loginForm.markAllAsTouched();
    return;
  }

  this.isLoading = true;
  this.errorMessage = '';

  const email = this.loginForm.get('email')?.value;
  const password = this.loginForm.get('password')?.value;

  console.log('Email extraído:', email);
  console.log('Password extraído:', password);
  console.log('Llamando al AuthService.login()...');

  this.authService.login(email, password).subscribe({
    next: (users) => {  
      console.log('RESPUESTA COMPLETA del AuthService:', users);
      console.log('Número de usuarios encontrados:', users.length);
      
      if (users && Array.isArray(users) && users.length > 0) {
        console.log('✅ Login exitoso - usuario encontrado:', users[0]);
        console.log('✅ Intentando redirigir...');
        
        // Prueba diferentes rutas
        this.router.navigate(['/home']).then(
          (success) => {
            console.log('Navegación a /home exitosa:', success);
          },
          (error) => {
            console.error('Error navegando a /home:', error);
            // Si /home falla, prueba con otras rutas
            console.log('Probando navegación a /...');
            this.router.navigate(['/']).then(
              (success2) => {
                console.log('Navegación a / exitosa:', success2);
              },
              (error2) => {
                console.error('Error navegando a /:', error2);
                console.log('Rutas disponibles en el router:', this.router.config);
              }
            );
          }
        );
      } else {
        console.log('❌ Login fallido - credenciales incorrectas');
        this.errorMessage = 'Credenciales incorrectas';
      }
      this.isLoading = false;
    },
    error: (error) => {
      console.error('❌ ERROR COMPLETO en el login:', error);
      this.errorMessage = 'Error en el servidor. Intenta nuevamente.';
      this.isLoading = false;
    }
  });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}