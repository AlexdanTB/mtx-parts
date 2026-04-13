import { CarritoItem } from "./carrito-item";

export interface Pedido {
  id?: number;
  detalles: { productoId: number; cantidad: number }[];
  direccionEnvio: string;
  estado?: 'PENDIENTE' | 'PAGADO' | 'ENTREGADO' | 'ANULADO';
  fecha?: string;
  total?: number;
  usuarioId?: number;
  usuarioNombre?: string;
  usuarioEmail?: string;
}

export interface PedidoResponse {
  id: number;
  detalles: { productoId: number; cantidad: number }[];
  direccionEnvio: string;
  estado: string;
  fecha: string;
  total: number;
  usuarioId: number;
  usuarioNombre: string;
  usuarioEmail: string;
}
