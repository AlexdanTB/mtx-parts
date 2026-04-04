import { Routes } from '@angular/router';
import { HomePage } from './features/home-page/home-page';
import { ContactoPage } from './features/contacto-page/contacto-page';

export const routes: Routes = [
{path:'',component:HomePage},
{path:'contacto',component:ContactoPage}

];
