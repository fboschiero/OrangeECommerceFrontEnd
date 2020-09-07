import { Injectable } from '@angular/core';
import { OrdenCompra } from '../modelsBD/OrdenCompra';
import { Item } from '../modelsBD/Item';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../modelsBD/Producto';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {

  private API_URL = environment.API_URL;

  listaCompras: OrdenCompra[] = [];

  constructor(private http: HttpClient) {
  }

  obtenerCompras(email: string): any {
    console.log(`Obteniendo las compras del usuario ${email}`);

    return this.http.get(`${this.API_URL}/getMisCompras/${email}`)
      .pipe(
        map(resp => this.crearArreglo(resp))
      );

  }
  
  crearArreglo(resp: Object) {

    console.log(resp);
    

    this.listaCompras = [];

    if (resp == null){
      return;
    }
    
    Object.keys(resp).forEach( key => {

      if (key === 'ordenesCompra') {
        
        const largo =  resp[key].length;
        for (let i = 0; i < largo; i++) {
          const orden: OrdenCompra = new OrdenCompra ();
          orden.id = resp[key][i].id;
          orden.numero = resp[key][i].numero;
          orden.impuestos = resp[key][i].impuestos;
          orden.fecha = resp[key][i].fecha;
          orden.estado = resp[key][i].estado;

          orden.items = [];

          const largoItems =  resp[key][i].items.length;
          for (let j = 0; j < largoItems; j++) {
            
            const item: Item = new Item();
            item.cantidad = resp[key][i].items[j].cantidad;
            item.precio = resp[key][i].items[j].precio;

            if (resp[key][i].items[j].producto != null) {
              const producto: Producto = new Producto();
              producto.id = resp[key][i].items[j].producto['id'];
              producto.nombre = resp[key][i].items[j].producto['nombre'];
              producto.imagenes = resp[key][i].items[j].producto['imagenes'];

              item.producto = producto;
            }

            orden.items.push(item);
          }

          this.listaCompras.push(orden);
        }
        
      }
    });

    return this.listaCompras;

  }

  getOrdenCompra(index: string): OrdenCompra {
    return this.listaCompras[index];
  }
  
}
