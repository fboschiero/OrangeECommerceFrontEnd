import { Injectable } from '@angular/core';
import { Producto } from '../modelsBD/Producto';
import { Item } from '../modelsBD/Item';
import { OrdenCompra } from '../modelsBD/OrdenCompra';
import { Imagen } from '../modelsBD/Imagen';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {

  listaCompras: OrdenCompra[] = [];

  constructor() {

    const img = new Imagen();
    img.url = '../../../assets/articulos/img/img-1.jpeg';

    const imagenes = [];
    imagenes.push(img);

    const producto1 = new Producto();
    producto1.precioVenta = 500;
    producto1.nombre = 'Pantalon';
    producto1.imagenes = imagenes;
    
    const img2 = new Imagen();
    img2.url = '../../../assets/articulos/img/narcos.jpg';

    const imagenes2 = [];
    imagenes2.push(img2);

    const producto2 = new Producto();
    producto2.precioVenta = 300;
    producto2.nombre = 'Buzo';
    producto2.imagenes = imagenes;

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
    this.listaCompras.push(ordenCompra);
    this.listaCompras.push(ordenCompra);

    const items2: Item[] = [];
    items2.push(item1);
    items2.push(item1);
    items2.push(item2);
    items2.push(item2);

    const ordenCompra2 = new OrdenCompra();
    ordenCompra2.fecha = new Date();
    ordenCompra2.items = items2;

    this.listaCompras.push(ordenCompra2);
    this.listaCompras.push(ordenCompra2);
    this.listaCompras.push(ordenCompra2);

  }

  obtenerCompras(email: string, fechaDesde: Date, fechaHasta: Date): OrdenCompra[] {
    console.log(`Obteniendo las compras del usuario ${email}`);
    return this.listaCompras;
  }

  getOrdenCompra(index: string): OrdenCompra {
    return this.listaCompras[index];
  }
  
}
