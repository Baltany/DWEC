import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth';
import { PeliculaService, Pelicula } from '../services/pelicula';
import { Usuario } from '../services/usuario';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit {
  peliculas: Pelicula[] = [];
  usuario: Usuario | null = null;
  loading = true;

  constructor(
    private authService: AuthService,
    private peliculaService: PeliculaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.usuario = this.authService.getCurrentUser();
    this.cargarPeliculas();
  }

  cargarPeliculas(): void {
    this.loading = true;
    
    if (this.authService.isAdmin()) {
      // Admin ve todas las películas
      this.peliculaService.getPeliculas().subscribe({
        next: (peliculas) => {
          this.peliculas = peliculas;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error al cargar películas:', error);
          this.loading = false;
        }
      });
    } else if (this.authService.isCliente()) {
      // Cliente ve solo sus películas
      const usuarioId = this.usuario?.id;
      if (usuarioId) {
        this.peliculaService.getPeliculasByUsuario(usuarioId).subscribe({
          next: (peliculas) => {
            this.peliculas = peliculas;
            this.loading = false;
          },
          error: (error) => {
            console.error('Error al cargar películas:', error);
            this.loading = false;
          }
        });
      }
    }
  }

  crearPelicula(): void {
    this.router.navigate(['/peliculas/nueva']);
  }

  editarPelicula(id: number): void {
    this.router.navigate(['/peliculas/editar', id]);
  }

  eliminarPelicula(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar esta película?')) {
      this.peliculaService.eliminarPelicula(id).subscribe({
        next: () => {
          this.peliculas = this.peliculas.filter(p => p.id !== id);
        },
        error: (error) => {
          console.error('Error al eliminar película:', error);
          alert('Error al eliminar la película');
        }
      });
    }
  }

  puedeEditarPelicula(pelicula: Pelicula): boolean {
    if (this.authService.isAdmin()) {
      return true; // Admin puede editar todas
    }
    return pelicula.usuarioId === this.usuario?.id; // Cliente solo sus películas
  }

  irADashboardAdmin(): void {
    if (this.authService.isAdmin()) {
      this.router.navigate(['/admin/dashboard']);
    }
  }
}