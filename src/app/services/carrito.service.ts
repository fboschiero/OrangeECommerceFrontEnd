import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Carrito } from '../models/carrito';
import { Item } from '../models/item';


@Injectable({
  providedIn: 'root'
})

export class CarritoService {

  private API_URL = environment.API_URL;

  constructor(private http: HttpClient) { }
  
  agregarAlCarrito(articulo_id: number, color_id: number, talle_id: number, cantidadad: number, precio: number) {
    
    var carrito: Carrito = JSON.parse(localStorage.getItem('carrito'));
    if(!carrito){
      carrito = new Carrito();
      carrito.id = new Date().getTime();
      carrito.items = [];
    }

    var nuevoItem = new Item();
    nuevoItem.articulo_id = articulo_id;
    nuevoItem.color_id = color_id;
    nuevoItem.talle_id = talle_id;
    nuevoItem.cantidad = cantidadad;
    nuevoItem.precio = precio;    
    
    carrito.items.push(nuevoItem);
    
    localStorage.setItem('carrito', JSON.stringify(carrito));

    console.log(carrito);
    //let body = "";
    //return this.http.post(this.API_URL + '/insertCategoria', body);
  }


}
