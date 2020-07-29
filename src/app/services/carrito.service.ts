import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Carrito } from '../models/carrito';
import { Item } from '../models/item';

import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class CarritoService {

  private API_URL = environment.API_URL;
  

  constructor(private http: HttpClient) { }
  
  agregarAlCarrito(articulo_id: number, color_id: number, talle_id: number, cantidadad: number, precio: number) {
    
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };

    var carrito: Carrito = JSON.parse(localStorage.getItem('carrito'));
    var nuevoItem = new Item();
    if(!carrito){
      carrito = new Carrito();
      carrito.fecha = new Date();
      carrito.numero = carrito.fecha.getTime()+"";
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

    let body = JSON.stringify(carrito);

    //console.log(body);

    return this.http.post(`${ environment.API_URL }/agregarAlCarrito`, body, httpOptions)
      .pipe(map(carrito => {

      console.log('Nuevo usuario response: ' + JSON.stringify(carrito));

      if (carrito) {

       

      }

      return carrito;

    }));
    
  }


}
