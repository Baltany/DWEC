import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth';
import { PeliculaService } from '../../services/pelicula';

@Component({
  selector: 'app-nueva-pelicula',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './nueva-pelicula.html',
  styleUrls: ['./nueva-pelicula.css']
})
export class NuevaPeliculaComponent {
  private fb = inject(FormBuilder);
  private peliculaService = inject(PeliculaService);
  private authService = inject(AuthService);
  private router = inject(Router);

  currentUser = this.authService.getCurrentUser();
  loading = false;

  peliculaForm = this.fb.group({
    titulo: ['', [Validators.required, Validators.minLength(2)]],
    director: ['', [Validators.required, Validators.minLength(2)]],
    anio: [new Date().getFullYear(), [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear() + 5)]],
    genero: ['', [Validators.required]],
    descripcion: ['', [Validators.required, Validators.minLength(10)]]
  });

  generos = [
    'Acción', 'Aventura', 'Comedia', 'Drama', 'Terror', 'Ciencia Ficción',
    'Fantasía', 'Romance', 'Thriller', 'Misterio', 'Animación', 'Documental'
  ];

  onSubmit() {
    if (this.peliculaForm.valid && this.currentUser) {
      this.loading = true;
      
      const peliculaData = {
        titulo: this.peliculaForm.value.titulo as string,
        director: this.peliculaForm.value.director as string,
        anio: this.peliculaForm.value.anio as number,
        genero: this.peliculaForm.value.genero as string,
        descripcion: this.peliculaForm.value.descripcion as string,
        userId: this.currentUser.id!
      };

      this.peliculaService.createPelicula(peliculaData).subscribe({
        next: () => {
          alert('¡Película creada exitosamente!');
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Error creando película:', error);
          alert('Error al crear la película. Intenta nuevamente.');
          this.loading = false;
        }
      });
    }
  }

  // Función para obtener errores de un campo
  getFieldError(fieldName: string): string {
    const field = this.peliculaForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) return `${fieldName} es obligatorio`;
      if (field.errors['minlength']) return `${fieldName} debe tener al menos ${field.errors['minlength'].requiredLength} caracteres`;
      if (field.errors['min']) return `El año debe ser mayor a ${field.errors['min'].min}`;
      if (field.errors['max']) return `El año no puede ser mayor a ${field.errors['max'].max}`;
    }
    return '';
  }
}