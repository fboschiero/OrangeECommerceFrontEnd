import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

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
import { AbmArticuloComponent } from './components/private/articulo/nuevoArticulo/abm-articulo.component';
import { CheckoutComponent } from './components/public/checkout/checkout.component';
import { CompraComponent } from './components/public/compra/compra.component';
import { MisComprasComponent } from './components/private/compras/mis-compras/mis-compras.component';
import { BuscarComponent } from './components/public/buscar/buscar.component';
import { registerLocaleData } from '@angular/common';
import localUY from '@angular/common/locales/es-UY';
import { DetalleCompraComponent } from './components/private/compras/detalle-compra/detalle-compra.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll'
import { NgxPaginationModule } from 'ngx-pagination';
import { ListadoArticulosComponent } from './components/private/articulo/listadoArticulos/listado-articulos.component';
import { YesNoPipe } from './pipe/yes-no.pipe';

registerLocaleData(localUY);

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
    MisComprasComponent,
    BuscarComponent,
    DetalleCompraComponent,
    ListadoArticulosComponent,
    YesNoPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    InfiniteScrollModule,
    NgxPaginationModule
  ],
  providers: [
    HttpClient,
    { provide: LOCALE_ID, useValue: 'es-UY'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
