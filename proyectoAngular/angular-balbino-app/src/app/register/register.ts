import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth';
import { Usuario } from '../services/usuario';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  selector: 'app-register',
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required], 
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const userData: Usuario = { 
      nombre: this.registerForm.get('nombre')?.value, 
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value,
      rol: 'cliente'
    };

    console.log('Datos a registrar:', userData);

    this.authService.register(userData).subscribe({
      next: (success: boolean) => { 
        if (success) {
          console.log('Registro exitoso');
          this.router.navigate(['/home']);
        } else {
          this.errorMessage = 'Error al registrar usuario';
        }
        this.isLoading = false;
      },
      error: (err: any) => { 
        console.error('Error en registro:', err);
        this.errorMessage = 'Error en el servidor. Intenta nuevamente.';
        this.isLoading = false;
      }
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}