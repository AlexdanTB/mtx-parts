import { Component } from '@angular/core';

@Component({
  selector: 'app-producto-detail',
  imports: [],
  templateUrl: './producto-detail.html',
  styleUrl: './producto-detail.css',
})
export class ProductoDetail {

  cantidad: number = 0;

  incrementarC(){
    this.cantidad++;
  }
  decrementarC(){
    if(this.cantidad > 0)
    this.cantidad--;
  }

}
