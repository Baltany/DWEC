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
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient, private router: Router) {}

  register(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  // ✅ MÉTODO LOGIN CORREGIDO
  login(email: string, password: string): Observable<User[]> {
    console.log('AuthService.login llamado con:', { email, password });
    
    return this.http.get<User[]>(
      `${this.apiUrl}?email=${email}&password=${password}`
    ).pipe(
      tap((users: User[]) => {
        console.log('Respuesta del servidor:', users);
        if (users.length > 0) {
          console.log('Usuario encontrado, guardando en localStorage');
          localStorage.setItem('currentUser', JSON.stringify(users[0]));
          this.loggedIn.next(true);
        } else {
          console.log('No se encontró usuario con esas credenciales');
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  getCurrentUser(): User | null {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }
}