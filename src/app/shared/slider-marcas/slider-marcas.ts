import { Component } from '@angular/core';

@Component({
  selector: 'app-slider-marcas',
  imports: [],
  templateUrl: './slider-marcas.html',
  styleUrl: './slider-marcas.css',
})
export class SliderMarcas {
  marcasMotos = [
    { nombre: 'Honda', img: 'https://i.postimg.cc/6QF2kf4m/honda_removebg_preview.png' },
    { nombre: 'Yamaha', img: 'https://i.postimg.cc/DzRJ9P4N/yamaha_removebg_preview.png' },
    { nombre: 'Suzuki', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Suzuki_logo_2025_%28vertical%29.svg/1280px-Suzuki_logo_2025_%28vertical%29.svg.png' },
    { nombre: 'Kawasaki', img: 'https://i.postimg.cc/hGNzk1QC/kawasaki_removebg_preview.png' },
    { nombre: 'KTM', img: 'https://i.postimg.cc/bv4D79SV/ktm_removebg_preview.png' },
    { nombre: 'Ducati', img: 'https://upload.wikimedia.org/wikipedia/commons/6/66/Ducati_red_logo.PNG' },
    { nombre: 'BMW', img: 'https://i.postimg.cc/W3rFTq0w/bmw_removebg_preview.png' },
    { nombre: 'Shineray ', img: 'https://i.postimg.cc/mDMzB17S/Shineray_removebg_preview.png' }
  ];
}
