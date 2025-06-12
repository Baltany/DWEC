import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { LoginComponent } from './login/login';
import { RegisterComponent } from './register/register';
import { DashboardAdminComponent } from './admin/dashboard-admin/dashboard-admin';
import { AuthGuard } from './guards/auth-guard';
import { AdminGuard } from './guards/admin-guard';

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
  
  // Rutas para películas (si las tienes)
  // { path: 'peliculas/nueva', component: NuevaPeliculaComponent, canActivate: [AuthGuard] },
  // { path: 'peliculas/editar/:id', component: EditarPeliculaComponent, canActivate: [AuthGuard] },
  
  { path: '**', redirectTo: '/home' } 
];