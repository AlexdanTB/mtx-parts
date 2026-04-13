export interface Usuarios {
  id?: string;
  nombre: string;
  email: string;
  password: string;
  foto: string;
  rol: 'ROLE_ADMIN' | 'ROLE_USUARIO'; 
}