import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'cliente';  // ✅ Agregamos el rol
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private currentUserSubject = new BehaviorSubject<User | null>(null);  // ✅ Para reactividad
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient, private router: Router) {
    // ✅ Inicializar el usuario actual si existe en localStorage
    const savedUser = this.getCurrentUser();
    if (savedUser) {
      this.loggedIn.next(true);
      this.currentUserSubject.next(savedUser);
    }
  }

  register(user: User): Observable<User> {
    // ✅ Aseguramos que todos los nuevos usuarios sean "cliente"
    const userWithRole = { ...user, role: 'cliente' as const };
    return this.http.post<User>(this.apiUrl, userWithRole);
  }

  login(email: string, password: string): Observable<User[]> {
    console.log('AuthService.login llamado con:', { email, password });
    
    return this.http.get<User[]>(
      `${this.apiUrl}?email=${email}&password=${password}`
    ).pipe(
      tap((users: User[]) => {
        console.log('Respuesta del servidor:', users);
        if (users.length > 0) {
          console.log('Usuario encontrado, guardando en localStorage');
          const user = users[0];
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.loggedIn.next(true);
          this.currentUserSubject.next(user);  // ✅ Actualizamos el subject
        } else {
          console.log('No se encontró usuario con esas credenciales');
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.loggedIn.next(false);
    this.currentUserSubject.next(null);  // ✅ Limpiamos el subject
    this.router.navigate(['/login']);
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  getCurrentUser(): User | null {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }

  getCurrentUser$(): Observable<User | null> {
    return this.currentUserSubject.asObservable();
  }

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'admin';
  }

  isCliente(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'cliente';
  }

  getUserRole(): 'admin' | 'cliente' | null {
    const user = this.getCurrentUser();
    return user?.role || null;
  }
}