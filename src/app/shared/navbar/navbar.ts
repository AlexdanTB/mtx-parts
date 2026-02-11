import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

  isMenuOpen: boolean = false;
  isSubMenuOpen: boolean = false;

  toggleSubMenu():void{
    this.isSubMenuOpen = !this.isMenuOpen;
  }

}
