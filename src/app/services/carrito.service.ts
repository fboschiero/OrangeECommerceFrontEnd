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
  
  agregarAlCarrito(articulo_id: number, nombre: string, img_articulo: string, color_id: number, talle_id: number, cantidadad: number, precio: number) {
    
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
    nuevoItem.urlImagen = img_articulo;
    nuevoItem.carrito_id = carrito.numero;
    nuevoItem.nombre = nombre;

    carrito.items.push(nuevoItem);

    // Verifico si existe el mismo articulo
    //for(let i=0; i<carrito.items.length; i++){
    //  if(carrito.items[i].articulo_id = articulo_id){
        // El articulo  
    //  }
    //}
    
    
    localStorage.setItem('carrito', JSON.stringify(carrito));

    let body = JSON.stringify(carrito);

    return this.http.post(`${ environment.API_URL }/agregarAlCarrito`, body, httpOptions)
      .pipe(map(carrito => {

        if (carrito) {

        }

      return carrito;

    }));
    
  }

  eliminarArticulo(index: number, item: Item){
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };

    let body = JSON.stringify(item);

    return this.http.post(`${ environment.API_URL }/eliminarArticulo`, body, httpOptions)
      .pipe(map(borrado => {

      if (borrado) {
        var carrito: Carrito = JSON.parse(localStorage.getItem('carrito'));
        carrito.items.splice(index);
        localStorage.setItem('carrito', JSON.stringify(carrito));
      }


    return borrado;

  }));
  }

 


}
