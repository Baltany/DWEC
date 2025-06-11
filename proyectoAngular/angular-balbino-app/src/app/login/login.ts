import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms'; 
import { AuthService } from '../auth';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Usuario } from '../services/usuario';

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
    next: (loginSuccess: boolean) => { // ✅ Tipado correcto
      console.log('RESPUESTA del AuthService (boolean):', loginSuccess);
      
      if (loginSuccess) {
        console.log('✅ Login exitoso');
        const currentUser = this.authService.getCurrentUser();
        console.log('Usuario actual:', currentUser);
        
        this.router.navigate(['/home']).then(
          (success) => {
            console.log('Navegación exitosa:', success);
          },
          (error) => {
            console.error('Error navegando:', error);
          }
        );
      } else {
        console.log('❌ Login fallido');
        this.errorMessage = 'Credenciales incorrectas';
      }
      this.isLoading = false;
    },
    error: (error: any) => { // ✅ Tipado error
      console.error('❌ ERROR en el login:', error);
      this.errorMessage = 'Error en el servidor. Intenta nuevamente.';
      this.isLoading = false;
    }
  });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}