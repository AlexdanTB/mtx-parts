import { Routes } from '@angular/router';
import { HomePage } from './features/home-page/home-page';
import { ContactoPage } from './features/contacto-page/contacto-page';
import { NosotrosPage } from './features/nosotros-page/nosotros-page';
import { ProductosPage } from './features/productos-page/productos-page';
import { Register } from './shared/register/register';
import { Login } from './shared/login/login';
import { canActiveGuard } from './guards/can-active-guard';

export const routes: Routes = [
    { path: '', component: HomePage },
    { path: 'contacto', component: ContactoPage },
    {path: 'nosotros', component: NosotrosPage },
    { path: 'repuestos', component: ProductosPage },
    {path:'registrarse',component: Register},
    {path:'login',component: Login,canActivate: [canActiveGuard]},


];
