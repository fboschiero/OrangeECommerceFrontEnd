import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { OrdenCompra } from '../modelsBD/OrdenCompra';
import { Item } from '../modelsBD/Item';
import { map } from 'rxjs/operators';
import { Producto } from '../modelsBD/Producto';
import { Descuento } from '../modelsBD/Descuento';

@Injectable({
  providedIn: 'root'
})

export class CarritoService {

  private API_URL = environment.API_URL;
  

  constructor(private http: HttpClient) { }
  
  agregarAlCarrito(articulo: Producto, nombre: string, img_articulo: string, color: string, talle: string, cantidadad: number, precio: number) {
    
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };

    var carrito: OrdenCompra = JSON.parse(localStorage.getItem('carrito'));
    var nuevoItem = new Item();
    if(!carrito){
      carrito = new OrdenCompra();
      carrito.fecha = new Date();
      carrito.numero = carrito.fecha.getTime()+"";
      carrito.items = [];
    }

    var nuevoItem = new Item();
    nuevoItem.color = color;
    nuevoItem.talle = talle;
    nuevoItem.cantidad = cantidadad;
    nuevoItem.precio = precio;   
    nuevoItem.producto = articulo; 
    
    var descuento = new Descuento();
    descuento.id = null;
    nuevoItem.descuento = descuento;  

    carrito.items.push(nuevoItem);

    // Verifico si existe el mismo articulo
    //for(let i=0; i<carrito.items.length; i++){
    //  if(carrito.items[i].articulo_id = articulo_id){
        // El articulo  
    //  }
    //}
    
    let body = JSON.stringify(carrito);
    
    return this.http.post(`${ environment.API_URL }/agregarAlCarrito/`, body, httpOptions)
      .pipe(map(orden => {

        console.log(orden);

        if (orden['ok'] == true) {
          carrito.id = orden['orden_compra_id'];
          
          localStorage.setItem('carrito', JSON.stringify(carrito));

          let body = JSON.stringify(carrito);

        }

      return orden;

    }));
    
  }

  eliminarArticulo(index: number, item: Item, indice:number){
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    var body = {
      table: [],
      id: []
    };
    
    body.table.push(item);
    body.id.push(index);
    let body2 = JSON.stringify(body);

    return this.http.post(`${ environment.API_URL }/eliminarArticulo/`, body2, httpOptions)
      .pipe(map(borrado => {

      if (borrado) {
        var carrito: OrdenCompra = JSON.parse(localStorage.getItem('carrito'));
        
        //Aca es el merengue que no me deja borrar del localstorage
        console.log('Carrito item ' + JSON.stringify(carrito.items) + 'INDEXX ' + index);
        carrito.items.splice(indice, 1);
        localStorage.setItem('carrito', JSON.stringify(carrito));
      }

      return borrado;

    }));
  }

  confirmarCompra(orden){
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };

    let body = JSON.stringify(orden);
    
    return this.http.post(`${ environment.API_URL }/confirmarCompra/`, body, httpOptions)
      .pipe(map(resp => {

      if (resp) {
        // Borro el carrito de la memoria
        localStorage.getItem('carrito');
      }
      
      return resp;

    }));
  }

  

 


}
