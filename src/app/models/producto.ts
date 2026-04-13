export interface Producto {
    id?: string;
    sku: string;
    nombre: string;
    descripcion: string;
    precio: number;
    stock: number;
    imagen_url: string;
}