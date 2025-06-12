import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PeliculaService, Pelicula } from '../../services/pelicula';
import { AuthService } from '../../auth';

@Component({
  selector: 'app-pelicula-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './nueva-pelicula.html',
  styleUrls: ['./nueva-pelicula.css']
})
export class PeliculaFormComponent implements OnInit {
  peliculaForm: FormGroup;
  isEditing = false;
  peliculaId: string | null = null;
  loading = false;
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private peliculaService: PeliculaService,
    public authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.peliculaForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(1)]],
      director: ['', [Validators.required, Validators.minLength(1)]],
      genero: ['', [Validators.required]],
      anio: ['', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear() + 5)]],
      duracion: ['', [Validators.required, Validators.min(1)]],
      sinopsis: ['', [Validators.required, Validators.minLength(10)]],
      poster: ['']
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditing = true;
        this.peliculaId = params['id'];
        this.cargarPelicula();
      }
    });
  }

  cargarPelicula(): void {
    if (!this.peliculaId) return;
    
    this.loading = true;
    this.peliculaService.getPelicula(this.peliculaId).subscribe({
      next: (pelicula) => {
        // Verificar si el usuario puede editar esta película
        if (!this.puedeEditarPelicula(pelicula)) {
          alert('No tienes permisos para editar esta película');
          this.router.navigate(['/home']);
          return;
        }
        
        this.peliculaForm.patchValue({
          titulo: pelicula.titulo,
          director: pelicula.director,
          genero: pelicula.genero,
          anio: pelicula.anio,
          duracion: pelicula.duracion,
          sinopsis: pelicula.sinopsis,
          poster: pelicula.poster || ''
        });
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar película:', error);
        alert('Error al cargar la película');
        this.router.navigate(['/home']);
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.peliculaForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    this.submitting = true;
    const userId = this.authService.getCurrentUser()?.id;

    const peliculaData: Pelicula = {
      ...this.peliculaForm.value,
      userId,
      usuarioId: userId
    };

    if (this.isEditing && this.peliculaId) {
      // Actualizar película existente
      this.peliculaService.actualizarPelicula(this.peliculaId, peliculaData).subscribe({
        next: () => {
          alert('Película actualizada exitosamente');
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Error al actualizar película:', error);
          alert('Error al actualizar la película');
          this.submitting = false;
        }
      });
    } else {
      // Crear nueva película
      this.peliculaService.crearPelicula(peliculaData).subscribe({
        next: () => {
          alert('Película creada exitosamente');
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Error al crear película:', error);
          alert('Error al crear la película');
          this.submitting = false;
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/home']);
  }

  private puedeEditarPelicula(pelicula: Pelicula): boolean {
    const currentUser = this.authService.getCurrentUser();
    if (this.authService.isAdmin()) {
      return true; // Admin puede editar todas
    }
    return pelicula.userId === currentUser?.id; // Cliente solo sus películas
  }

  private markFormGroupTouched(): void {
    Object.keys(this.peliculaForm.controls).forEach(key => {
      this.peliculaForm.get(key)?.markAsTouched();
    });
  }

  // Getters para validación en el template
  get titulo() { return this.peliculaForm.get('titulo'); }
  get director() { return this.peliculaForm.get('director'); }
  get genero() { return this.peliculaForm.get('genero'); }
  get anio() { return this.peliculaForm.get('anio'); }
  get duracion() { return this.peliculaForm.get('duracion'); }
  get sinopsis() { return this.peliculaForm.get('sinopsis'); }
  get poster() { return this.peliculaForm.get('poster'); }
}