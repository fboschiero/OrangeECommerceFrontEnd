import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/public/navbar/navbar.component';
import { LoginComponent } from './components/public/login/login.component';
import { HomeComponent } from './components/public/home/home.component';
import { UserComponent } from './components/private/user/user.component';
import { HttpClient, HttpClientModule  } from '@angular/common/http';
import { CarritoComponent } from './components/public/carrito/carrito.component';
import { FooterComponent } from './components/public/footer/footer.component';
import { FiltrosComponent } from './components/public/filtros/filtros.component';
import { CardComponent } from './components/public/card/card.component';
import { ArticuloComponent } from './components/public/articulo/articulo.component';
import { CategoriaComponent } from './components/private/categoria/categoria.component';
import { FormsModule } from '@angular/forms';
import { AbmArticuloComponent } from './components/private/articulo/abm-articulo.component';
import { CheckoutComponent } from './components/public/checkout/checkout.component';
import { CompraComponent } from './components/public/compra/compra.component';
import { OrdenCompraComponent } from './components/private/orden-compra/orden-compra.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    UserComponent,
    CarritoComponent,
    FooterComponent,
    FiltrosComponent,
    CardComponent,
    ArticuloComponent,
    CategoriaComponent,
    AbmArticuloComponent,
    CheckoutComponent,
    CompraComponent,
    OrdenCompraComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
