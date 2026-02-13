import { Component } from '@angular/core';

@Component({
  selector: 'app-cat-grids',
  imports: [],
  templateUrl: './cat-grids.html',
  styleUrl: './cat-grids.css',
})
export class CatGrids {

  categorias = [
    {titulo: "Motor", img: "https://www.galgo.com/wp-content/uploads/2023/09/desgaste-del-motor-2.jpg", link:'#'},
    {titulo: "Estético", img: "https://i.postimg.cc/XvF5H5jq/plasticos-mtx.jpg", link:'#'},
    {titulo: "Sistema Eléctrico", img: "https://motomecanico.com.mx/wp-content/uploads/2024/05/sistema-electrico-motos.png", link:'#'},
    {titulo: "Tren delantero", img: "https://www.moto1pro.com/sites/default/files/movimientos-tren-delantero-moto-1.jpg", link:'#'},
    {titulo: "Tren Posterior", img: "https://bxrepsol.s3.eu-west-1.amazonaws.com/static/2023/06/08054443/Foto-2-1024x702.jpg", link:'#'},
    {titulo: "Transmisión", img: "https://www.pruebaderuta.com/wp-content/uploads/2016/02/kit-arrastre-moto-620x264.jpg", link:'#'},
  ]

}
