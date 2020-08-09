import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Publico
import { LoginComponent } from './components/public/login/login.component';
import { HomeComponent } from './components/public/home/home.component';
import { CarritoComponent } from './components/public/carrito/carrito.component';
import { ArticuloComponent } from './components/public/articulo/articulo.component';
import { CheckoutComponent } from './components/public/checkout/checkout.component';
import { CompraComponent } from './components/public/compra/compra.component';
import { BuscarComponent } from './components/public/buscar/buscar.component';

// Privado
import { UserComponent } from './components/private/user/user.component';

import { LoginGuard } from './guards/login.guard';
import { CategoriaComponent } from './components/private/categoria/categoria.component';
import { AbmArticuloComponent } from './components/private/articulo/abm-articulo.component';
import { MisComprasComponent } from './components/private/compras/mis-compras/mis-compras.component';
import { DetalleCompraComponent } from './components/private/compras/detalle-compra/detalle-compra.component';

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

  // listados
  { path: 'mis-compras', component: MisComprasComponent},
  { path: 'detalle-compra/:index', component: DetalleCompraComponent},

  // Busqueda
  { path: 'buscar', component: BuscarComponent},


  { path: '**', pathMatch: 'full', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
