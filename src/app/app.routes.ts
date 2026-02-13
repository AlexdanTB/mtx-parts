import { Routes } from '@angular/router';
import { DetalleProdPage } from './features/detalle-prod-page/detalle-prod-page';
import { HomePage } from './features/home-page/home-page';

export const routes: Routes = [
    {path:'', component: HomePage},
    {path:'producto', component: DetalleProdPage}
];