import { Routes } from '@angular/router';
import { DetalleProdPage } from './features/detalle-prod-page/detalle-prod-page';
import { HomePage } from './features/home-page/home-page';
import { ContactoPage } from './features/contacto-page/contacto-page';
import { NosotrosPage } from './features/nosotros-page/nosotros-page';

export const routes: Routes = [
    { path: '', component: HomePage },
    { path: 'contacto', component: ContactoPage },
    { path: 'producto', component: DetalleProdPage },
    { path: 'nosotros', component: NosotrosPage }
];
