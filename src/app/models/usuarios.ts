export interface Usuarios {
  id?: number;
  nombreCompleto: string;
  email: string;
  telefono?: string;
  direccion?: string;
  rol: 'ROLE_ADMIN' | 'ROLE_CLIENTE';
}
