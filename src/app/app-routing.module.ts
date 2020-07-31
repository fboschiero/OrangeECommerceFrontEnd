import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Publico
import { LoginComponent } from './components/public/login/login.component';
import { HomeComponent } from './components/public/home/home.component';
import { CarritoComponent } from './components/public/carrito/carrito.component';
import { ArticuloComponent } from './components/public/articulo/articulo.component';
import { CheckoutComponent } from './components/public/checkout/checkout.component';
import { CompraComponent } from './components/public/compra/compra.component';

// Privado
import { UserComponent } from './components/private/user/user.component';

import { LoginGuard } from './guards/login.guard';
import { CategoriaComponent } from './components/private/categoria/categoria.component';
import { AbmArticuloComponent } from './components/private/articulo/abm-articulo.component';
import { OrdenCompraComponent } from './components/private/orden-compra/orden-compra.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'user', component: UserComponent, canActivate: [LoginGuard]},
  { path: 'login', component: LoginComponent},
  { path: 'carrito', component: CarritoComponent},

  //para ingresar categoria
  { path: 'categoria', component: CategoriaComponent},

  //para ingresar a articulo
  { path: 'articulo/:id', component: ArticuloComponent},
  { path: 'agregarArticulo', component: AbmArticuloComponent},

  //para finalizar una compra
  { path: 'checkout', component: CheckoutComponent},
  { path: 'compra', component: CompraComponent},

  { path: 'orden-compra', component: OrdenCompraComponent},

  { path: '**', pathMatch: 'full', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
