import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-producto-card',
  imports: [RouterLink],
  templateUrl: './producto-card.html',
  styleUrl: './producto-card.css',
})
export class ProductoCard {
// Función para calcular el % de descuento automáticamente
  calcularDescuento(normal: number, descuento: number): number {
    return Math.round(((normal - descuento) / normal) * 100);
  }

  // Arreglo con los 6 combos
  combos = [
    {
      id: 1,
      nombre: 'Kit Afinamiento Pro',
      incluye: 'Aceite Motul 7100, Filtro de Aceite K&N, Lubricante de Cadena Motul.',
      precioNormal: 85.00,
      precioDescuento: 65.00,
      imagen: 'https://pierce-images.imgix.net/images/c/0/9/a/c09a18e7f6be4d868695ea4283126dd1_2_PP-4971628_0_10.png?bg=F0F1F2&q=60&auto=format&h=414&w=414',
      rating: 5.0
    },
    {
      id: 2,
      nombre: 'Kit de Arrastre Reforzado',
      incluye: 'Cadena DID O-Ring dorada, Catalina de acero de 45 dientes, Piñón 15T.',
      precioNormal: 120.00,
      precioDescuento: 95.00,
      imagen: 'https://importadoraokla.com/wp-content/uploads/2025/12/11990-1.jpg',
      rating: 4.8
    },
    {
      id: 3,
      nombre: 'Combo Frenado Seguro',
      incluye: 'Juego de Pastillas Delanteras Sinterizadas, Pastillas Traseras, Líquido DOT 4.',
      precioNormal: 60.00,
      precioDescuento: 48.00,
      imagen: 'https://www.4x4.ec/wp-content/uploads/2024/09/Ironman-4x4-Brake-Pads-2.jpg',
      rating: 4.9
    },
    {
      id: 4,
      nombre: 'Kit Llantas City Grip',
      incluye: 'Llanta Delantera 110/70-17 + Llanta Trasera 140/70-17 Michelin.',
      precioNormal: 210.00,
      precioDescuento: 175.00,
      imagen: 'https://m.media-amazon.com/images/I/718nm+KXiXL._AC_SL1500_.jpg',
      rating: 5.0
    },
    {
      id: 5,
      nombre: 'Combo Viajero Extremo',
      incluye: 'Maletero de 45L de Aluminio, Soporte Universal, Red de carga elástica.',
      precioNormal: 350.00,
      precioDescuento: 299.00,
      imagen: 'https://www.otomracing.com.ec/wp-content/uploads/2024/07/MALETERO-NEGRO.jpg',
      rating: 4.7
    },
    {
      id: 6,
      nombre: 'Kit Limpieza y Lubricación',
      incluye: 'Lubricante de cadena Motul C4, Limpiador C1, Cepillo de 3 caras.',
      precioNormal: 45.00,
      precioDescuento: 32.00,
      imagen: 'https://http2.mlstatic.com/D_NQ_NP_853168-MLU72822966239_112023-O.webp',
      rating: 4.9
    }
  ];
}
