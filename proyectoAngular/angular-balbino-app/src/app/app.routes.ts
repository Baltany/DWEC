import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { LoginComponent } from './login/login';
import { RegisterComponent } from './register/register';
import { DashboardAdminComponent } from './admin/dashboard-admin/dashboard-admin';
import { AuthGuard } from './guards/auth-guard';
import { AdminGuard } from './guards/admin-guard';
import { PeliculaFormComponent } from './peliculas/nueva-pelicula/nueva-pelicula';


export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, 
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  
  // Rutas de administración - protegidas con AdminGuard
  { 
    path: 'admin/dashboard', 
    component: DashboardAdminComponent, 
    canActivate: [AuthGuard, AdminGuard] 
  },
  
  // Rutas para películas 
{ 
    path: 'peliculas/nueva', 
    component: PeliculaFormComponent, 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'peliculas/editar/:id', 
    component: PeliculaFormComponent, 
    canActivate: [AuthGuard] 
  },
  
  { path: '**', redirectTo: '/home' } 
];