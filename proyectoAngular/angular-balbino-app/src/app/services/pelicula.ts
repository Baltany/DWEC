import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Pelicula {
  id?: number;
  titulo: string;
  director: string;
  anio: number;
  genero: string;
  descripcion: string;
  userId: string | number;
}

@Injectable({
  providedIn: 'root'
})
export class PeliculaService {
  private apiUrl = 'http://localhost:3000/peliculas';

  constructor(private http: HttpClient) {}

  // ✅ Obtener todas las películas (para admin)
  getAllPeliculas(): Observable<Pelicula[]> {
    return this.http.get<Pelicula[]>(this.apiUrl);
  }

  // ✅ Obtener películas de un usuario específico (para cliente)
  getPeliculasByUser(userId: string | number): Observable<Pelicula[]> {
    return this.http.get<Pelicula[]>(`${this.apiUrl}?userId=${userId}`);
  }

  // ✅ Obtener una película por ID
  getPeliculaById(id: number): Observable<Pelicula> {
    return this.http.get<Pelicula>(`${this.apiUrl}/${id}`);
  }

  // ✅ Crear nueva película
  createPelicula(pelicula: Pelicula): Observable<Pelicula> {
    return this.http.post<Pelicula>(this.apiUrl, pelicula);
  }

  // ✅ Actualizar película
  updatePelicula(id: number, pelicula: Pelicula): Observable<Pelicula> {
    return this.http.put<Pelicula>(`${this.apiUrl}/${id}`, pelicula);
  }

  // ✅ Eliminar película
  deletePelicula(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}