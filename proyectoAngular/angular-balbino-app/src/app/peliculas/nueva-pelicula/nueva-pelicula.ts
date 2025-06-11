import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PeliculaService } from '../../services/pelicula';
import { AuthService } from '../../auth';

@Component({
  selector: 'app-nueva-pelicula',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container">
      <div class="form-card">
        <div class="header">
          <h2>Añadir Nueva Película</h2>
          <button class="btn-back" (click)="volver()">← Volver</button>
        </div>

        <form [formGroup]="peliculaForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="titulo">Título *</label>
            <input 
              type="text" 
              id="titulo" 
              formControlName="titulo"
              class="form-control"
              [class.error]="peliculaForm.get('titulo')?.invalid && peliculaForm.get('titulo')?.touched">
            <div class="error-message" *ngIf="peliculaForm.get('titulo')?.invalid && peliculaForm.get('titulo')?.touched">
              El título es obligatorio
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="director">Director *</label>
              <input 
                type="text" 
                id="director" 
                formControlName="director"
                class="form-control"
                [class.error]="peliculaForm.get('director')?.invalid && peliculaForm.get('director')?.touched">
              <div class="error-message" *ngIf="peliculaForm.get('director')?.invalid && peliculaForm.get('director')?.touched">
                El director es obligatorio
              </div>
            </div>

            <div class="form-group">
              <label for="genero">Género *</label>
              <select 
                id="genero" 
                formControlName="genero"
                class="form-control"
                [class.error]="peliculaForm.get('genero')?.invalid && peliculaForm.get('genero')?.touched">
                <option value="">Seleccionar género</option>
                <option value="Acción">Acción</option>
                <option value="Aventura">Aventura</option>
                <option value="Comedia">Comedia</option>
                <option value="Drama">Drama</option>
                <option value="Terror">Terror</option>
                <option value="Romance">Romance</option>
                <option value="Ciencia Ficción">Ciencia Ficción</option>
                <option value="Fantasía">Fantasía</option>
                <option value="Thriller">Thriller</option>
                <option value="Animación">Animación</option>
                <option value="Documental">Documental</option>
              </select>
              <div class="error-message" *ngIf="peliculaForm.get('genero')?.invalid && peliculaForm.get('genero')?.touched">
                El género es obligatorio
              </div>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="anio">Año *</label>
              <input 
                type="number" 
                id="anio" 
                formControlName="anio"
                class="form-control"
                min="1900"
                max="2030"
                [class.error]="peliculaForm.get('anio')?.invalid && peliculaForm.get('anio')?.touched">
              <div class="error-message" *ngIf="peliculaForm.get('anio')?.invalid && peliculaForm.get('anio')?.touched">
                <span *ngIf="peliculaForm.get('anio')?.errors?.['required']">El año es obligatorio</span>
                <span *ngIf="peliculaForm.get('anio')?.errors?.['min'] || peliculaForm.get('anio')?.errors?.['max']">
                  El año debe estar entre 1900 y 2030
                </span>
              </div>
            </div>

            <div class="form-group">
              <label for="duracion">Duración (minutos) *</label>
              <input 
                type="number" 
                id="duracion" 
                formControlName="duracion"
                class="form-control"
                min="1"
                max="500"
                [class.error]="peliculaForm.get('duracion')?.invalid && peliculaForm.get('duracion')?.touched">
              <div class="error-message" *ngIf="peliculaForm.get('duracion')?.invalid && peliculaForm.get('duracion')?.touched">
                <span *ngIf="peliculaForm.get('duracion')?.errors?.['required']">La duración es obligatoria</span>
                <span *ngIf="peliculaForm.get('duracion')?.errors?.['min'] || peliculaForm.get('duracion')?.errors?.['max']">
                  La duración debe estar entre 1 y 500 minutos
                </span>
              </div>
            </div>
          </div>

          <div class="form-group">
            <label for="poster">URL del Poster</label>
            <input 
              type="url" 
              id="poster" 
              formControlName="poster"
              class="form-control"
              placeholder="https://ejemplo.com/poster.jpg">
          </div>

          <div class="form-group">
            <label for="sinopsis">Sinopsis *</label>
            <textarea 
              id="sinopsis" 
              formControlName="sinopsis"
              class="form-control textarea"
              rows="4"
              placeholder="Describe brevemente la película..."
              [class.error]="peliculaForm.get('sinopsis')?.invalid && peliculaForm.get('sinopsis')?.touched"></textarea>
            <div class="error-message" *ngIf="peliculaForm.get('sinopsis')?.invalid && peliculaForm.get('sinopsis')?.touched">
              La sinopsis es obligatoria
            </div>
          </div>

          <div class="form-actions">
            <button type="button" class="btn-cancel" (click)="volver()">Cancelar</button>
            <button type="submit" class="btn-submit" [disabled]="peliculaForm.invalid || loading">
              <span *ngIf="loading">Guardando...</span>
              <span *ngIf="!loading">Guardar Película</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .container {
      max-width: 800px;
      margin: 20px auto;
      padding: 20px;
    }

    .form-card {
      background: white;
      border-radius: 12px;
      padding: 30px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      border: 1px solid #e0e0e0;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
      padding-bottom: 20px;
      border-bottom: 2px solid #f0f0f0;
    }

    .header h2 {
      margin: 0;
      color: #333;
      font-size: 1.8rem;
      font-weight: 600;
    }

    .btn-back {
      background: #6c757d;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 0.9rem;
      transition: background-color 0.3s ease;
    }

    .btn-back:hover {
      background: #5a6268;
    }

    .form-group {
      margin-bottom: 20px;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }

    label {
      display: block;
      margin-bottom: 8px;
      font-weight: 600;
      color: #333;
      font-size: 0.9rem;
    }

    .form-control {
      width: 100%;
      padding: 12px 16px;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      font-size: 1rem;
      transition: all 0.3s ease;
      box-sizing: border-box;
    }

    .form-control:focus {
      outline: none;
      border-color: #4ecdc4;
      box-shadow: 0 0 0 3px rgba(78, 205, 196, 0.1);
    }

    .form-control.error {
      border-color: #dc3545;
      box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
    }

    .textarea {
      resize: vertical;
      min-height: 100px;
    }

    .error-message {
      color: #dc3545;
      font-size: 0.8rem;
      margin-top: 5px;
      font-weight: 500;
    }

    .form-actions {
      display: flex;
      gap: 15px;
      justify-content: flex-end;
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #f0f0f0;
    }

    .btn-cancel {
      background: #6c757d;
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 8px;
      cursor: pointer;
      font-size: 1rem;
      font-weight: 500;
      transition: all 0.3s ease;
    }

    .btn-cancel:hover {
      background: #5a6268;
      transform: translateY(-1px);
    }

    .btn-submit {
      background: linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%);
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 8px;
      cursor: pointer;
      font-size: 1rem;
      font-weight: 600;
      transition: all 0.3s ease;
      min-width: 150px;
    }

    .btn-submit:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    }

    .btn-submit:disabled {
      background: #ccc;
      cursor: not-allowed;
      transform: none;
    }

    @media (max-width: 768px) {
      .container {
        padding: 15px;
      }

      .form-card {
        padding: 20px;
      }

      .header {
        flex-direction: column;
        gap: 15px;
        align-items: stretch;
      }

      .form-row {
        grid-template-columns: 1fr;
        gap: 0;
      }

      .form-actions {
        flex-direction: column;
      }
    }
  `]
})
export class NuevaPeliculaComponent {
  peliculaForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private peliculaService: PeliculaService,
    private authService: AuthService,
    private router: Router
  ) {
    this.peliculaForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(2)]],
      director: ['', [Validators.required, Validators.minLength(2)]],
      genero: ['', Validators.required],
      anio: ['', [Validators.required, Validators.min(1900), Validators.max(2030)]],
      duracion: ['', [Validators.required, Validators.min(1), Validators.max(500)]],
      poster: [''],
      sinopsis: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit(): void {
    if (this.peliculaForm.valid) {
      this.loading = true;
      const usuario = this.authService.getCurrentUser();
      
      const nuevaPelicula = {
        ...this.peliculaForm.value,
        usuarioId: usuario?.id
      };

      this.peliculaService.crearPelicula(nuevaPelicula).subscribe({
        next: () => {
          this.loading = false;
          alert('Película creada exitosamente');
          this.router.navigate(['/home']);
        },
        error: (error) => {
          this.loading = false;
          console.error('Error al crear película:', error);
          alert('Error al crear la película. Por favor, inténtalo de nuevo.');
        }
      });
    } else {
      // Marcar todos los campos como tocados para mostrar errores
      Object.keys(this.peliculaForm.controls).forEach(key => {
        this.peliculaForm.get(key)?.markAsTouched();
      });
    }
  }

  volver(): void {
    this.router.navigate(['/home']);
  }
}