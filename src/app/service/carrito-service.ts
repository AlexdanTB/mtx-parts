import { Injectable, signal, computed } from '@angular/core';
import { CarritoItem } from '../models/carrito-item';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  private readonly STORAGE_KEY = 'carrito';

  items = signal<CarritoItem[]>(this.cargarDesdeStorage());

  cantidadTotal = computed(() =>
    this.items().reduce((sum, item) => sum + item.cantidad, 0)
  );

  totalCarrito = computed(() =>
    this.items().reduce((sum, item) => sum + item.precio * item.cantidad, 0)
  );

  private guardarEnStorage(items: CarritoItem[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
  }

  private cargarDesdeStorage(): CarritoItem[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  agregarItem(item: CarritoItem): void {
    const items = this.items();
    const existente = items.find(i => i.idProducto === item.idProducto);

    if (existente) {
      existente.cantidad += item.cantidad;
      this.items.set([...items]);
    } else {
      this.items.set([...items, item]);
    }
    this.guardarEnStorage(this.items());
  }

  actualizarCantidad(idProducto: string, cantidad: number): void {
    if (cantidad <= 0) {
      this.eliminarItem(idProducto);
      return;
    }
    const items = this.items().map(item =>
      item.idProducto === idProducto ? { ...item, cantidad } : item
    );
    this.items.set(items);
    this.guardarEnStorage(items);
  }

  eliminarItem(idProducto: string): void {
    const items = this.items().filter(i => i.idProducto !== idProducto);
    this.items.set(items);
    this.guardarEnStorage(items);
  }

  vaciarCarrito(): void {
    this.items.set([]);
    localStorage.removeItem(this.STORAGE_KEY);
  }
}

