import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Pelicula {
  id?: number;
  titulo: string;
  director: string;
  genero: string;
  anio: number;
  duracion: number;
  sinopsis: string;
  poster?: string;
  usuarioId?: number; // ID del usuario que creó la película
}

@Injectable({
  providedIn: 'root'
})
export class PeliculaService {
  private apiUrl = 'http://localhost:3000/peliculas';

  constructor(private http: HttpClient) { }

  // Obtener todas las películas
  getPeliculas(): Observable<Pelicula[]> {
    return this.http.get<Pelicula[]>(this.apiUrl);
  }

  // Obtener películas por usuario
  getPeliculasByUsuario(usuarioId: number): Observable<Pelicula[]> {
    return this.http.get<Pelicula[]>(`${this.apiUrl}?usuarioId=${usuarioId}`);
  }

  // Obtener película por ID
  getPelicula(id: number): Observable<Pelicula> {
    return this.http.get<Pelicula>(`${this.apiUrl}/${id}`);
  }

  // Crear nueva película
  crearPelicula(pelicula: Pelicula): Observable<Pelicula> {
    return this.http.post<Pelicula>(this.apiUrl, pelicula);
  }

  // Actualizar película
  actualizarPelicula(id: number, pelicula: Pelicula): Observable<Pelicula> {
    return this.http.put<Pelicula>(`${this.apiUrl}/${id}`, pelicula);
  }

  // Eliminar película
  eliminarPelicula(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}