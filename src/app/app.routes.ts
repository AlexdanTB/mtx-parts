import { Routes } from '@angular/router';
import { HomePage } from './features/home-page/home-page';
import { ContactoPage } from './features/contacto-page/contacto-page';
import { NosotrosPage } from './features/nosotros-page/nosotros-page';

export const routes: Routes = [
    { path: '', component: HomePage },
    { path: 'contacto', component: ContactoPage },
    {path: 'nosotros', component: NosotrosPage },

];
