import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth'; // Ajusta la ruta según tu estructura
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'] // Si tienes estilos
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  currentUser: any = null; // Aquí está la propiedad que faltaba

  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    // Suscribirse al estado de autenticación
    this.authService.isLoggedIn$.subscribe(
      (loggedIn) => {
        this.isLoggedIn = loggedIn;
        if (loggedIn) {
          this.currentUser = this.authService.getCurrentUser();
        } else {
          this.currentUser = null;
        }
      }
    );
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}