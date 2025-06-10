import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms'; 
import { AuthService } from '../auth';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true, 
  imports: [ReactiveFormsModule, CommonModule, RouterModule], // Añade RouterModule
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  loginForm: FormGroup;

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
      return;
    }

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: (user) => {  
        if (user) { 
          this.router.navigate(['/']); // Redirige a home si login es exitoso
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

  // Método para redirigir a registro (opcional)
  goToRegister() {
    this.router.navigate(['/register']);
  }
}