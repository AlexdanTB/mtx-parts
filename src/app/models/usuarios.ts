export interface Usuarios {
  id?: string;
  name: string;
  email: string;
  password: string;
  imagen_url: string;
  phone: string;
  address: string;
  rol: 'ROLE_ADMIN' | 'ROLE_USUARIO'; 
}