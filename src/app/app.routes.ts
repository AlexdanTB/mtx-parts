import { Routes } from '@angular/router';
import { DetalleProdPage } from './features/detalle-prod-page/detalle-prod-page';
import { HomePage } from './features/home-page/home-page';
import { ContactoPage } from './features/contacto-page/contacto-page';
import { NosotrosPage } from './features/nosotros-page/nosotros-page';
import { ProductosPage } from './features/productos-page/productos-page';
import { Register } from './shared/register/register';
import { Login } from './shared/login/login';
import { canActiveGuard } from './guards/can-active-guard';
import { LoginRegisterPage } from './features/login-register-page/login-register-page';

export const routes: Routes = [
    { path: '', component: HomePage },
    { path: 'contacto', component: ContactoPage },
    { path: 'nosotros', component: NosotrosPage },
    { path: 'repuestos', component: ProductosPage },
    { path: 'registrarse', component: Register },
    { path: 'producto', component: DetalleProdPage },
    { path: 'logins', component: LoginRegisterPage, canActivate: [canActiveGuard] },
    { path: 'login', component: Login, }
];