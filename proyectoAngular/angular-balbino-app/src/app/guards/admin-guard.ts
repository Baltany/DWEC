// guards/admin-guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth'; 

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): boolean {
    console.log('AdminGuard: Verificando acceso...');
    
    const esAdmin = this.authService.isAdmin();
    console.log('AdminGuard: Es admin?', esAdmin);
    
    if (esAdmin) {
      console.log('AdminGuard: Acceso permitido');
      return true;
    }
    
    console.log('AdminGuard: Acceso denegado, redirigiendo a home');
    this.router.navigate(['/home']);
    return false;
  }
}