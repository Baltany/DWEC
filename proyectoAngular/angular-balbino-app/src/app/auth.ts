import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { UsuarioService, Usuario } from './services/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<Usuario | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private usuarioService: UsuarioService) {
    // Recuperar usuario del localStorage al inicializar
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  login(email: string, password: string): Observable<boolean> {
    return this.usuarioService.buscarPorEmail(email).pipe(
      map(usuarios => {
        const usuario = usuarios.find(u => u.email === email && u.password === password);
        if (usuario) {
          // Guardar usuario en localStorage y actualizar subject
          localStorage.setItem('currentUser', JSON.stringify(usuario));
          this.currentUserSubject.next(usuario);
          return true;
        }
        return false;
      }),
      catchError(() => of(false))
    );
  }

  register(usuario: Usuario): Observable<boolean> {
    return this.usuarioService.crearUsuario({
      ...usuario,
      rol: 'cliente' // Por defecto los registros son clientes
    }).pipe(
      map(newUser => {
        if (newUser) {
          // Auto-login después del registro
          localStorage.setItem('currentUser', JSON.stringify(newUser));
          this.currentUserSubject.next(newUser);
          return true;
        }
        return false;
      }),
      catchError(() => of(false))
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  getCurrentUser(): Usuario | null {
    return this.currentUserSubject.value;
  }

  isLoggedIn(): boolean {
    return this.currentUserSubject.value !== null;
  }

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.rol === 'admin';
  }

  isCliente(): boolean {
    const user = this.getCurrentUser();
    return user?.rol === 'cliente';
  }
}