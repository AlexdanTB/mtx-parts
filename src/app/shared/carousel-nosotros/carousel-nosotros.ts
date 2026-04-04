import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Slide {
  id: number;
  titulo: string;
  subtitulo: string;
  descripcion: string;
  imagen: string;
}

@Component({
  selector: 'app-carousel-nosotros',
  imports: [CommonModule],
  templateUrl: './carousel-nosotros.html',
  styleUrl: './carousel-nosotros.css',
})
export class CarouselNosotros implements OnInit, OnDestroy {

  currentSlide = 0;
  private intervalId: ReturnType<typeof setInterval> | null = null;
  readonly AUTOPLAY_DELAY = 5000;

  slides: Slide[] = [
    {
      id: 1,
      titulo: 'Pasión por las dos ruedas',
      subtitulo: 'Nuestra Historia',
      descripcion: 'Nacimos en los pits, creados por motociclistas para motociclistas. Entendemos el valor de cada tuerca.',
      imagen: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1920&q=80',
    },
    {
      id: 2,
      titulo: 'Calidad que respalda',
      subtitulo: 'Nuestro Compromiso',
      descripcion: 'Solo trabajamos con repuestos certificados que garantizan la máxima potencia y seguridad en el asfalto.',
      imagen: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1920&q=80',
    },
    {
      id: 3,
      titulo: 'Tu moto, tu estilo',
      subtitulo: 'Personalización sin Límites',
      descripcion: 'Ofrecemos una amplia gama de accesorios para que tu moto refleje tu personalidad única.',
      imagen: 'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?auto=format&fit=crop&w=1920&q=80',
    },
    {
      id: 4,
      titulo: 'Servicio que acelera',
      subtitulo: 'Atención al Cliente',
      descripcion: 'Nuestro equipo de expertos está siempre listo para asesorarte y encontrar el repuesto perfecto.',
      imagen: 'https://images.unsplash.com/photo-1615172282427-9a57ef2d142e?auto=format&fit=crop&w=1920&q=80',
    },
  ];

  get slideActual(): string {
    return String(this.currentSlide + 1).padStart(2, '0');
  }

  get totalSlides(): string {
    return String(this.slides.length).padStart(2, '0');
  }

  ngOnInit(): void {
    this.startAutoPlay();
  }

  ngOnDestroy(): void {
    this.clearAutoPlay();
  }

  startAutoPlay(): void {
    this.intervalId = setInterval(() => this.next(), this.AUTOPLAY_DELAY);
  }

  clearAutoPlay(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  // Reinicia el contador al navegar manualmente — fix del memory leak
  resetAutoPlay(): void {
    this.clearAutoPlay();
    this.startAutoPlay();
  }

  pauseAutoPlay(): void {
    this.clearAutoPlay();
  }

  next(): void {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  prev(): void {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }

  setSlide(index: number): void {
    this.currentSlide = index;
    this.resetAutoPlay();
  }

  onPrev(): void {
    this.prev();
    this.resetAutoPlay();
  }

  onNext(): void {
    this.next();
    this.resetAutoPlay();
  }
}