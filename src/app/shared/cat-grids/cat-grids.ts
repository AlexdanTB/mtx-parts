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
    {titulo: "Sistema Eléctrico", img: "https://http2.mlstatic.com/D_NQ_NP_2X_823000-MEC96069376488_102025-T.webp", link:'#'},
    {titulo: "Tren delantero", img: "https://www.moto1pro.com/sites/default/files/movimientos-tren-delantero-moto-1.jpg", link:'#'},
    {titulo: "Tren Posterior", img: "https://bxrepsol.s3.eu-west-1.amazonaws.com/static/2023/06/08054443/Foto-2-1024x702.jpg", link:'#'},
    {titulo: "Transmisión", img: "https://www.motociclismo.es/uploads/s1/11/54/31/86/kit-transmision-moto.jpeg", link:'#'},
  ]

}
