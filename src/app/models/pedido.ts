import { CarritoItem } from "./carrito-item";

export interface Pedido {
  id?: string;
  idUsuario: string;
  nombreUsuario: string;
  correoUsuario: string;
  items: CarritoItem[];
  total: number;
  estado: 'pendiente' | 'procesando' | 'enviado' | 'entregado' | 'cancelado';
  fecha: string;
  direccion: string;
  telefono: string;
}
