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
    public authService: AuthService,
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
        this.peliculaService.getPeliculasByUsuario(String(usuarioId)).subscribe({
          next: (peliculas) => {
            // Filtrar películas del usuario actual (por si el endpoint no filtra correctamente)
            this.peliculas = peliculas.filter(pelicula => 
              String(pelicula.userId) === String(usuarioId)
            );
            this.loading = false;
          },
          error: (error) => {
            console.error('Error al cargar películas:', error);
            this.loading = false;
          }
        });
      } else {
        this.loading = false;
      }
    } else {
      this.loading = false;
    }
  }

  crearPelicula(): void {
    this.router.navigate(['/peliculas/nueva']);
  }

  editarPelicula(id: string): void {
    this.router.navigate(['/peliculas/editar', id]);
  }

  eliminarPelicula(id: string): void {
    if (confirm('¿Estás seguro de que quieres eliminar esta película?')) {
      this.peliculaService.eliminarPelicula(id).subscribe({
        next: () => {
          this.peliculas = this.peliculas.filter(p => p.id !== id);
          alert('Película eliminada correctamente');
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
    // Verificar tanto userId como usuarioId para compatibilidad
    const currentUserId = this.usuario?.id;
    return pelicula.userId === currentUserId;
  }


  irADashboardAdmin(): void {
    console.log('🔍 Botón Dashboard Admin clickeado');
    console.log('🔍 Usuario actual:', this.usuario);
    console.log('🔍 Es admin?', this.authService.isAdmin());
    
    if (this.authService.isAdmin()) {
      console.log('✅ Usuario es admin, navegando...');
      this.router.navigate(['/admin/dashboard']).then(
        (success) => {
          console.log('✅ Navegación exitosa:', success);
          console.log('✅ URL actual:', this.router.url);
        }
      ).catch((error) => {
        console.error('❌ Error en navegación:', error);
      });
    } else {
      console.log('❌ Usuario NO es admin');
      alert('No tienes permisos de administrador');
    }
  }
  
  logout(): void {
    if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
      console.log('🚪 Cerrando sesión...');
      
      // Llamar al método logout del AuthService
      this.authService.logout();
      
      // Redireccionar al login
      this.router.navigate(['/login']).then(() => {
        console.log('✅ Sesión cerrada correctamente');
      }).catch((error) => {
        console.error('❌ Error al redireccionar:', error);
      });
    }
  }


}