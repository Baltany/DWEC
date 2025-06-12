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
      catchError((error: any) => of(false)) 
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
      catchError((error: any) => of(false)) 
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
    console.log('🔍 Verificando si es admin:', user);
    console.log('🔍 Rol del usuario:', user?.rol);
    
    const esAdmin = user?.rol === 'admin';
    console.log('🔍 Resultado isAdmin():', esAdmin);
    
    return esAdmin;
  }

  isCliente(): boolean {
    const user = this.getCurrentUser();
    return user?.rol === 'cliente';
  }
}




export { AuthService as default };

