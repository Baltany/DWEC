import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Pelicula {
  id?: string;
  titulo: string;
  director: string;
  genero: string;
  anio: number;
  duracion: number;
  sinopsis: string;
  poster?: string;
  userId?: string | number; 
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

  // Obtener películas por usuario (compatible con userId y usuarioId)
  getPeliculasByUsuario(usuarioId: string) {
    return this.http.get<Pelicula[]>(`${this.apiUrl}?usuarioId=${usuarioId}`);
  }



  // Obtener película por ID
  getPelicula(id: string): Observable<Pelicula> {
    return this.http.get<Pelicula>(`${this.apiUrl}/${id}`);
  }

  // Crear nueva película
  crearPelicula(pelicula: Pelicula): Observable<Pelicula> {
    // Asegurar compatibilidad con tu estructura JSON actual
    const peliculaData = {
      ...pelicula,
      userId: pelicula.userId , 
      usuarioId: pelicula.userId  
    };
    return this.http.post<Pelicula>(this.apiUrl, peliculaData);
  }

  // Actualizar película
  actualizarPelicula(id: string, pelicula: Pelicula): Observable<Pelicula> {
    // Asegurar compatibilidad con tu estructura JSON actual
    const peliculaData = {
      ...pelicula,
      userId: pelicula.userId,
      usuarioId: pelicula.userId
    };
    return this.http.put<Pelicula>(`${this.apiUrl}/${id}`, peliculaData);
  }

  // Eliminar película
  eliminarPelicula(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}