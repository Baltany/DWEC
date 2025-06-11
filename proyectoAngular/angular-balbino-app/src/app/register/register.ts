import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  registerForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  onSubmit() {
    if (this.registerForm.valid) {
      // ✅ Ahora incluimos el rol "cliente" por defecto
      const userData = {
        name: this.registerForm.value.name as string,
        email: this.registerForm.value.email as string,
        password: this.registerForm.value.password as string,
        role: 'cliente' as const 
      };

      this.authService.register(userData).subscribe({
        next: () => {
          alert('Registro exitoso! Por favor inicia sesión.');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          alert('Error en el registro. Intenta nuevamente.');
          console.error(err);
        }
      });
    }
  }
}