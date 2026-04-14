import { CarritoItem } from "./carrito-item";

export interface Pedido {
  id?: string;            
  usuario_id: string;      
  statusPedido: 'pendiente' | 'procesando' | 'enviado' | 'entregado' | 'cancelado'; 
  total: number;          
  fechaCreacion: string;  
  direccionEnvio: string; 
  items: CarritoItem[]; 
}