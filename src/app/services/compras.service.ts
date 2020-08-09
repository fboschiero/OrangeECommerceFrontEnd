import { Injectable } from '@angular/core';
import { Producto } from '../modelsBD/Producto';
import { Item } from '../modelsBD/Item';
import { OrdenCompra } from '../modelsBD/OrdenCompra';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {

  listaCompras: OrdenCompra[] = [];

  constructor() {

    const producto1 = new Producto();
    producto1.precioVenta = 500;
    producto1.nombre = 'Pantalon';
    
    const producto2 = new Producto();
    producto2.precioVenta = 300;
    producto2.nombre = 'Buzo';

    const item1 = new Item();
    item1.precio = producto1.precioVenta;
    item1.producto = producto1;
    item1.cantidad = 5;

    const item2 = new Item();
    item2.precio = producto2.precioVenta;
    item2.producto = producto2;
    item2.cantidad = 2;

    const items: Item[] = [];
    items.push(item1);
    items.push(item2);
    items.push(item2);
    items.push(item2);
    items.push(item2);

    const ordenCompra = new OrdenCompra();
    ordenCompra.fecha = new Date();
    ordenCompra.items = items;

    this.listaCompras.push(ordenCompra);
    this.listaCompras.push(ordenCompra);
    this.listaCompras.push(ordenCompra);
    this.listaCompras.push(ordenCompra);

  }

  obtenerCompras(email: string, fechaDesde: Date, fechaHasta: Date): OrdenCompra[] {
    console.log(`Obteniendo las compras del usuario ${email}`);
    return this.listaCompras;
  }

  getOrdenCompra(index: string): OrdenCompra {
    return this.listaCompras[index];
  }
  
}
