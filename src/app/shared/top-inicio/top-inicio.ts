import { Component } from '@angular/core';

@Component({
  selector: 'app-top-inicio',
  imports: [],
  templateUrl: './top-inicio.html',
  styleUrl: './top-inicio.css',
})
export class TopInicio {

  currentSlide = 0;
  intervalId: any;

  slides = [
    {
      id: 1,
      etiqueta: 'Novedad',
      titulo: 'Kits de Arrastre de Alta Duración',
      imagen: 'https://images.unsplash.com/photo-1558980664-769d59546b3d?auto=format&fit=crop&w=1200&q=80',
      link: '/catalogo/kits'
    },
    {
      id: 2,
      etiqueta: 'Oferta Especial',
      titulo: 'Llantas Deportivas - 20% Off',
      imagen: 'https://images.unsplash.com/photo-1590282496734-d4b9b94236e7?auto=format&fit=crop&w=1200&q=80',
      link: '/catalogo/llantas'
    },
    {
      id: 3,
      etiqueta: 'Stock Limitado',
      titulo: 'Escapes Akrapovič Originales',
      imagen: 'https://images.unsplash.com/photo-1614165936126-281b67272204?auto=format&fit=crop&w=1200&q=80',
      link: '/catalogo/escapes'
    }
  ];

  ngOnInit() {
    // Autoplay del slider
    this.intervalId = setInterval(() => this.next(), 6000);
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  next() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  prev() {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }

  setSlide(index: number) {
    this.currentSlide = index;
  }


}
