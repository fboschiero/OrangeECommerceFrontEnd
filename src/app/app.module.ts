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
import { ArticulosComponent } from './components/public/articulos/articulos.component';
import { CategoriaComponent } from './components/private/categoria/categoria.component';
import { FormsModule } from '@angular/forms';

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
    ArticulosComponent,
    CategoriaComponent
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
