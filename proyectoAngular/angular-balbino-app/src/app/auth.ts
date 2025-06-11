import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { UsuarioService, Usuario } from './services/usuario'; // Corregir ruta

@Injectable({
  providedIn: 'root'
})
export class AuthService { // ✅ Ya está exportado
  private currentUserSubject = new BehaviorSubject<Usuario | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  public isLoggedIn$ = this.currentUser$.pipe(
    map(user => user !== null)
  ); 

  constructor(private usuarioService: UsuarioService) {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  login(email: string, password: string): Observable<boolean> {
    return this.usuarioService.buscarPorEmail(email).pipe(
      map((usuarios: Usuario[]) => {
        const usuario = usuarios.find((u: Usuario) => u.email === email && u.password === password);
        if (usuario) {
          localStorage.setItem('currentUser', JSON.stringify(usuario));
          this.currentUserSubject.next(usuario);
          return true;
        }
        return false;
      }),
      catchError((error: any) => of(false)) // ✅ Tipado error
    );
  }

  register(usuario: Usuario): Observable<boolean> {
    return this.usuarioService.crearUsuario({
      ...usuario,
      rol: 'cliente'
    }).pipe(
      map((newUser: Usuario) => {
        if (newUser) {
          localStorage.setItem('currentUser', JSON.stringify(newUser));
          this.currentUserSubject.next(newUser);
          return true;
        }
        return false;
      }),
      catchError((error: any) => of(false)) // ✅ Tipado error
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



// ✅ IMPORTANTE: Exportar explícitamente
export { AuthService as default };

