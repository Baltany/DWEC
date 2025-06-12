import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService, Usuario } from '../../services/usuario';
import { AuthService } from '../../auth';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './usuarios.html',
  styleUrls: ['./usuarios.css']
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  usuariosFiltrados: Usuario[] = [];
  loading = true;
  currentUserId: number;

  // Filtros
  filtroTexto = '';
  filtroRol = '';

  // Estadísticas
  totalAdmins = 0;
  totalClientes = 0;

  // Modal
  mostrarModal = false;
  mostrarModalEliminar = false;
  modoEdicion = false;
  usuarioForm: FormGroup;
  guardando = false;
  eliminando = false;
  usuarioAEliminar: Usuario | null = null;

  constructor(
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.currentUserId = this.authService.getCurrentUser()?.id || 0;
    this.usuarioForm = this.createForm();
  }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  createForm(): FormGroup {
    return this.fb.group({
      id: [null],
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(6)]],
      rol: ['', [Validators.required]]
    });
  }

  cargarUsuarios(): void {
    this.loading = true;
    this.usuarioService.getUsuarios().subscribe({
      next: (usuarios: Usuario[]) => {
        this.usuarios = usuarios;
        this.calcularEstadisticas();
        this.aplicarFiltros();
        this.loading = false;
      },
      error: (error: any) => {
        console.error('Error al cargar usuarios:', error);
        this.loading = false;
        this.mostrarError('Error al cargar los usuarios');
      }
    });
  }

  calcularEstadisticas(): void {
    this.totalAdmins = this.usuarios.filter(u => u.rol === 'admin').length;
    this.totalClientes = this.usuarios.filter(u => u.rol === 'cliente').length;
  }

  aplicarFiltros(): void {
    this.usuariosFiltrados = this.usuarios.filter(usuario => {
      const textoCoincide = this.filtroTexto === '' || 
        usuario.nombre.toLowerCase().includes(this.filtroTexto.toLowerCase()) ||
        usuario.email.toLowerCase().includes(this.filtroTexto.toLowerCase());
      
      const rolCoincide = this.filtroRol === '' || usuario.rol === this.filtroRol;
      
      return textoCoincide && rolCoincide;
    });
  }

  trackByUsuario(index: number, usuario: Usuario): number {
    return usuario.id || index;
  }

  formatearFecha(fecha?: string): string {
    if (!fecha) return 'N/A';
    return new Date(fecha).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  // Métodos del modal
  abrirModalCrear(): void {
    this.modoEdicion = false;
    this.usuarioForm = this.createForm();
    // En modo creación, la contraseña es requerida
    this.usuarioForm.get('password')?.setValidators([Validators.required, Validators.minLength(6)]);
    this.usuarioForm.get('password')?.updateValueAndValidity();
    this.mostrarModal = true;
  }

  editarUsuario(usuario: Usuario): void {
    this.modoEdicion = true;
    this.usuarioForm = this.createForm();
    
    // En modo edición, la contraseña no es requerida
    this.usuarioForm.get('password')?.setValidators([Validators.minLength(6)]);
    this.usuarioForm.get('password')?.updateValueAndValidity();
    
    // Cargar datos del usuario
    this.usuarioForm.patchValue({
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol
    });
    
    this.mostrarModal = true;
  }

  cerrarModal(): void {
    this.mostrarModal = false;
    this.usuarioForm.reset();
    this.guardando = false;
  }

  guardarUsuario(): void {
    if (this.usuarioForm.invalid) {
      this.marcarCamposComoTocados();
      return;
    }

    this.guardando = true;
    const datosUsuario = this.usuarioForm.value;

    if (this.modoEdicion) {
      // Actualizar usuario existente
      const usuarioActualizado: Usuario = {
        ...datosUsuario
      };
      
      // Si no se proporcionó contraseña, no la incluir en la actualización
      if (!datosUsuario.password) {
        delete usuarioActualizado.password;
      }

      this.usuarioService.actualizarUsuario(datosUsuario.id, usuarioActualizado).subscribe({
        next: () => {
          this.mostrarExito('Usuario actualizado correctamente');
          this.cargarUsuarios();
          this.cerrarModal();
        },
        error: (error: any) => {
          console.error('Error al actualizar usuario:', error);
          this.mostrarError('Error al actualizar el usuario');
          this.guardando = false;
        }
      });
    } else {
      // Crear nuevo usuario
      const nuevoUsuario: Usuario = {
        nombre: datosUsuario.nombre,
        email: datosUsuario.email,
        password: datosUsuario.password,
        rol: datosUsuario.rol
      };

      this.usuarioService.crearUsuario(nuevoUsuario).subscribe({
        next: () => {
          this.mostrarExito('Usuario creado correctamente');
          this.cargarUsuarios();
          this.cerrarModal();
        },
        error: (error: any) => {
          console.error('Error al crear usuario:', error);
          if (error.status === 409) {
            this.mostrarError('Ya existe un usuario con ese email');
          } else {
            this.mostrarError('Error al crear el usuario');
          }
          this.guardando = false;
        }
      });
    }
  }

  confirmarEliminar(usuario: Usuario): void {
    if (usuario.id === this.currentUserId) {
      this.mostrarError('No puedes eliminar tu propio usuario');
      return;
    }
    
    this.usuarioAEliminar = usuario;
    this.mostrarModalEliminar = true;
  }

  cerrarModalEliminar(): void {
    this.mostrarModalEliminar = false;
    this.usuarioAEliminar = null;
    this.eliminando = false;
  }

  eliminarUsuario(): void {
    if (!this.usuarioAEliminar?.id) return;

    this.eliminando = true;
    this.usuarioService.eliminarUsuario(this.usuarioAEliminar.id).subscribe({
      next: () => {
        this.mostrarExito('Usuario eliminado correctamente');
        this.cargarUsuarios();
        this.cerrarModalEliminar();
      },
      error: (error: any) => {
        console.error('Error al eliminar usuario:', error);
        this.mostrarError('Error al eliminar el usuario');
        this.eliminando = false;
      }
    });
  }

  volverDashboard(): void {
    this.router.navigate(['/admin/dashboard']);
  }

  // Métodos auxiliares
  private marcarCamposComoTocados(): void {
    Object.keys(this.usuarioForm.controls).forEach(key => {
      this.usuarioForm.get(key)?.markAsTouched();
    });
  }

  private mostrarExito(mensaje: string): void {
    // Aquí puedes implementar un sistema de notificaciones
    // Por ahora usamos alert, pero puedes cambiarlo por un toast o snackbar
    alert(mensaje);
  }

  private mostrarError(mensaje: string): void {
    // Aquí puedes implementar un sistema de notificaciones
    alert(mensaje);
  }
}