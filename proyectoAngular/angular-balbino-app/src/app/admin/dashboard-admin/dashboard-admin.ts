import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { UsuarioService, Usuario } from "../../services/usuario";
import { PeliculaService, Pelicula } from '../../services/pelicula';
import { AuthService } from '../../auth';

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="dashboard-container">
      <div class="header">
        <h1>Panel de Administración</h1>
        <button class="btn-back" (click)="volverHome()">← Volver al Inicio</button>
      </div>

      <!-- Estadísticas -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon">👥</div>
          <div class="stat-info">
            <h3>{{ totalUsuarios }}</h3>
            <p>Usuarios Totales</p>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon">🎬</div>
          <div class="stat-info">
            <h3>{{ totalPeliculas }}</h3>
            <p>Películas Totales</p>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon">👤</div>
          <div class="stat-info">
            <h3>{{ totalClientes }}</h3>
            <p>Clientes</p>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon">👨‍💼</div>
          <div class="stat-info">
            <h3>{{ totalAdmins }}</h3>
            <p>Administradores</p>
          </div>
        </div>
      </div>

      <!-- Gestión de Usuarios -->
      <div class="section">
        <div class="section-header">
          <h2>Gestión de Usuarios</h2>
          <button class="btn-primary" (click)="crearUsuario()">
            <i class="icon">➕</i>
            Nuevo Usuario
          </button>
        </div>

        <div *ngIf="loadingUsuarios" class="loading">
          <div class="spinner"></div>
          <p>Cargando usuarios...</p>
        </div>

        <div *ngIf="!loadingUsuarios" class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Fecha Creación</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let usuario of usuarios">
                <td>{{ usuario.id }}</td>
                <td>{{ usuario.nombre }}</td>
                <td>{{ usuario.email }}</td>
                <td>
                  <span class="role-badge" [class]="usuario.rol">
                    {{ usuario.rol?.toUpperCase() }}
                  </span>
                </td>
                <td>{{ formatearFecha(usuario.fechaCreacion) }}</td>
                <td>
                  <div class="action-buttons">
                    <button class="btn-edit" (click)="editarUsuario(usuario.id!)">
                      ✏️ Editar
                    </button>
                    <button 
                      class="btn-delete" 
                      (click)="eliminarUsuario(usuario.id!)"
                      [disabled]="usuario.id === currentUserId">
                      🗑️ Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Gestión de Películas -->
      <div class="section">
        <div class="section-header">
          <h2>Películas del Sistema</h2>
          <button class="btn-primary" (click)="crearPelicula()">
            <i class="icon">🎬</i>
            Nueva Película
          </button>
        </div>

        <div *ngIf="loadingPeliculas" class="loading">
          <div class="spinner"></div>
          <p>Cargando películas...</p>
        </div>

        <div *ngIf="!loadingPeliculas" class="movies-grid">
          <div *ngFor="let pelicula of peliculas" class="movie-card-admin">
            <div class="movie-poster-small">
              <img [src]="pelicula.poster || '/assets/default-poster.jpg'" 
                   [alt]="pelicula.titulo">
            </div>
            
            <div class="movie-details">
              <h4>{{ pelicula.titulo }}</h4>
              <p><strong>Director:</strong> {{ pelicula.director }}</p>
              <p><strong>Año:</strong> {{ pelicula.anio }} | <strong>Género:</strong> {{ pelicula.genero }}</p>
              <p><strong>Creado por:</strong> {{ getUsuarioNombre(pelicula.usuarioId) }}</p>
            </div>
            
            <div class="movie-actions-admin">
              <button class="btn-edit-small" (click)="editarPelicula(pelicula.id!)">
                ✏️
              </button>
              <button class="btn-delete-small" (click)="eliminarPelicula(pelicula.id!)">
                🗑️
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 20px;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
      padding: 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 12px;
      color: white;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .header h1 {
      margin: 0;
      font-size: 2rem;
      font-weight: 600;
    }

    .btn-back {
      background: rgba(255, 255, 255, 0.2);
      color: white;
      border: 1px solid rgba(255, 255, 255, 0.3);
      padding: 10px 20px;
      border-radius: 8px;
      cursor: pointer;
      font-size: 0.9rem;
      transition: all 0.3s ease;
    }

    .btn-back:hover {
      background: rgba(255, 255, 255, 0.3);
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-bottom: 40px;
    }

    .stat-card {
      background: white;
      border-radius: 12px;
      padding: 25px;
      display: flex;
      align-items: center;
      gap: 20px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      border: 1px solid #e0e0e0;
      transition: transform 0.3s ease;
    }

    .stat-card:hover {
      transform: translateY(-2px);
    }

    .stat-icon {
      font-size: 2.5rem;
      background: linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%);
      color: white;
      width: 60px;
      height: 60px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .stat-info h3 {
      margin: 0;
      font-size: 2rem;
      font-weight: 700;
      color: #333;
    }

    .stat-info p {
      margin: 5px 0 0 0;
      color: #666;
      font-size: 0.9rem;
      font-weight: 500;
    }

    .section {
      background: white;
      border-radius: 12px;
      padding: 30px;
      margin-bottom: 30px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 25px;
      padding-bottom: 15px;
      border-bottom: 2px solid #f0f0f0;
    }

    .section-header h2 {
      margin: 0;
      font-size: 1.5rem;
      color: #333;
      font-weight: 600;
    }

    .btn-primary {
      background: linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%);
      color: white;
      border: none;
      padding: 12px 20px;
      border-radius: 8px;
      cursor: pointer;
      font-size: 0.9rem;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.3s ease;
    }

    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    }

    .loading {
      text-align: center;
      padding: 40px;
      color: #666;
    }

    .spinner {
      width: 30px;
      height: 30px;
      border: 3px solid #f3f3f3;
      border-top: 3px solid #4ecdc4;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto 15px;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .table-container {
      overflow-x: auto;
    }

    .data-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 15px;
    }

    .data-table th,
    .data-table td {
      padding: 12px 15px;
      text-align: left;
      border-bottom: 1px solid #e0e0e0;
    }

    .data-table th {
      background: #f8f9fa;
      font-weight: 600;
      color: #333;
      font-size: 0.9rem;
    }

    .data-table td {
      font-size: 0.9rem;
      color: #555;
    }

    .role-badge {
      padding: 4px 8px;
      border-radius: 12px;
      font-size: 0.7rem;
      font-weight: 600;
      text-transform: uppercase;
    }

    .role-badge.admin {
      background: #ff6b6b;
      color: white;
    }

    .role-badge.cliente {
      background: #4ecdc4;
      color: white;
    }

    .action-buttons {
      display: flex;
      gap: 8px;
    }

    .btn-edit, .btn-delete {
      padding: 6px 12px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.8rem;
      transition: all 0.3s ease;
    }

    .btn-edit {
      background: #feca57;
      color: white;
    }

    .btn-edit:hover {
      background: #ff9ff3;
    }

    .btn-delete {
      background: #ff6b6b;
      color: white;
    }

    .btn-delete:hover:not(:disabled) {
      background: #ee5a24;
    }

    .btn-delete:disabled {
      background: #ccc;
      cursor: not-allowed;
    }

    .movies-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }

    .movie-card-admin {
      background: #f8f9fa;
      border-radius: 8px;
      padding: 15px;
      display: flex;
      gap: 15px;
      align-items: center;
      border: 1px solid #e0e0e0;
    }

    .movie-poster-small {
      width: 60px;
      height: 80px;
      flex-shrink: 0;
      overflow: hidden;
      border-radius: 4px;
      background: #ddd;
    }

    .movie-poster-small img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .movie-details {
      flex: 1;
    }

    .movie-details h4 {
      margin: 0 0 8px 0;
      font-size: 1rem;
      color: #333;
    }

    .movie-details p {
      margin: 4px 0;
      font-size: 0.8rem;
      color: #666;
    }

    .movie-actions-admin {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    .btn-edit-small, .btn-delete-small {
      width: 35px;
      height: 35px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 0.9rem;
      transition: all 0.3s ease;
    }

    .btn-edit-small {
      background: #feca57;
      color: white;
    }

    .btn-delete-small {
      background: #ff6b6b;
      color: white;
    }

    .btn-edit-small:hover {
      transform: scale(1.1);
    }

    .btn-delete-small:hover {
      transform: scale(1.1);
    }

    @media (max-width: 768px) {
      .dashboard-container {
        padding: 15px;
      }

      .header {
        flex-direction: column;
        gap: 15px;
      }

      .section-header {
        flex-direction: column;
        gap: 15px;
        align-items: stretch;
      }

      .stats-grid {
        grid-template-columns: 1fr;
      }

      .movies-grid {
        grid-template-columns: 1fr;
      }

      .movie-card-admin {
        flex-direction: column;
        text-align: center;
      }
    }
  `]
})
export class DashboardAdminComponent implements OnInit {
  usuarios: Usuario[] = [];
  peliculas: Pelicula[] = [];
  loadingUsuarios = true;
  loadingPeliculas = true;
  currentUserId: number;

  // Estadísticas
  totalUsuarios = 0;
  totalPeliculas = 0;
  totalClientes = 0;
  totalAdmins = 0;

  constructor(
    private usuarioService: UsuarioService,
    private peliculaService: PeliculaService,
    private authService: AuthService,
    private router: Router
  ) {
    this.currentUserId = this.authService.getCurrentUser()?.id || 0;
  }

  ngOnInit(): void {
    this.cargarUsuarios();
    this.cargarPeliculas();
  }

  cargarUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe({
      next: (usuarios: Usuario[]) => {
        this.usuarios = usuarios;
        this.calcularEstadisticasUsuarios();
        this.loadingUsuarios = false;
      },
      error: (error: any) => {
        console.error('Error al cargar usuarios:', error);
        this.loadingUsuarios = false;
      }
    });
  }

  cargarPeliculas(): void {
    this.peliculaService.getPeliculas().subscribe({
      next: (peliculas: Pelicula[]) => {
        this.peliculas = peliculas;
        this.totalPeliculas = peliculas.length;
        this.loadingPeliculas = false;
      },
      error: (error: any) => {
        console.error('Error al cargar películas:', error);
        this.loadingPeliculas = false;
      }
    });
  }

  calcularEstadisticasUsuarios(): void {
    this.totalUsuarios = this.usuarios.length;
    this.totalClientes = this.usuarios.filter(u => u.rol === 'cliente').length;
    this.totalAdmins = this.usuarios.filter(u => u.rol === 'admin').length;
  }

  formatearFecha(fecha?: string): string {
    if (!fecha) return 'N/A';
    return new Date(fecha).toLocaleDateString('es-ES');
  }

  getUsuarioNombre(usuarioId?: number): string {
    if (!usuarioId) return 'N/A';
    const usuario = this.usuarios.find(u => u.id === usuarioId);
    return usuario?.nombre || 'Usuario no encontrado';
  }

  crearUsuario(): void {
    // Implementar modal o redirigir a formulario
    alert('Funcionalidad de crear usuario en desarrollo');
  }

  editarUsuario(id: number): void {
    // Implementar edición de usuarios
    alert(`Editar usuario ${id} - En desarrollo`);
  }

  eliminarUsuario(id: number): void {
    if (id === this.currentUserId) {
      alert('No puedes eliminar tu propio usuario');
      return;
    }

    if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      this.usuarioService.eliminarUsuario(id).subscribe({
        next: () => {
          this.usuarios = this.usuarios.filter(u => u.id !== id);
          this.calcularEstadisticasUsuarios();
          alert('Usuario eliminado exitosamente');
        },
        error: (error: any) => {
          console.error('Error al eliminar usuario:', error);
          alert('Error al eliminar el usuario');
        }
      });
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
          this.totalPeliculas = this.peliculas.length;
          alert('Película eliminada exitosamente');
        },
        error: (error: any) => {
          console.error('Error al eliminar película:', error);
          alert('Error al eliminar la película');
        }
      });
    }
  }

  volverHome(): void {
    this.router.navigate(['/home']);
  }
}