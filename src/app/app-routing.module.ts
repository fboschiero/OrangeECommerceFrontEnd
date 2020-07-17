import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Publico
import { LoginComponent } from './components/public/login/login.component';
import { HomeComponent } from './components/public/home/home.component';
import { CarritoComponent } from './components/public/carrito/carrito.component';

// Privado
import { UserComponent } from './components/private/user/user.component';

import { LoginGuard } from './guards/login.guard';
import { CategoriaComponent } from './components/private/categoria/categoria.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'user', component: UserComponent, canActivate: [LoginGuard]},
  { path: 'login', component: LoginComponent},
  { path: 'carrito', component: CarritoComponent},

  //para ingresar categoria
  { path: 'categoria', component: CategoriaComponent},

  { path: '**', pathMatch: 'full', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
