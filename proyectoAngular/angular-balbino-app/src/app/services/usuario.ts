import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface Usuario {
    id?: number;
    nombre: string;
    email: string;
    password: string;
    rol: 'admin' | 'cliente';
}

@Injectable({providedIn: 'root'})
export class UsuarioService {
    private apiUrl = 'http://localhost:3000/usuarios';

    constructor(private http : HttpClient) {}

    // Obtener todos los usuarios
    getUsuarios(): Observable<Usuario[]> {
        return this.http.get<Usuario[]>(this.apiUrl);
    }

    // Obtener usuario por ID
    getUsuario(id : number): Observable<Usuario> {
        return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
    }

    // Buscar usuario por email
    buscarPorEmail(email : string): Observable<Usuario[]> {
        return this.http.get<Usuario[]>(`${this.apiUrl}?email=${email}`);
    }

    // Crear nuevo usuario
    crearUsuario(usuario : Usuario): Observable<Usuario> {
        const nuevoUsuario = {
            ...usuario,
            fechaCreacion: new Date().toISOString()
        };
        return this.http.post<Usuario>(this.apiUrl, nuevoUsuario);
    }

    // Actualizar usuario
    actualizarUsuario(id : number, usuario : Usuario): Observable<Usuario> {
        return this.http.put<Usuario>(`${this.apiUrl}/${id}`, usuario);
    }

    // Eliminar usuario
    eliminarUsuario(id : number): Observable<any> {
        return this
            .http
            .delete(`${this.apiUrl}/${id}`);
    }

    // Verificar si existe un email
    existeEmail(email : string): Observable<boolean> {
        return new Observable(observer => {
            this
                .buscarPorEmail(email)
                .subscribe({
                    next: (usuarios) => {
                        observer.next(usuarios.length > 0);
                        observer.complete();
                    },
                    error: (error) => {
                        observer.error(error);
                    }
                });
        });
    }
}