import { Descuento } from './Descuento';
import { Producto } from './Producto';
export class Item {

    cantidad: number;
    precio: number;
    color: string;
    talle: string;

    descuento: Descuento;
    producto: Producto;

    constructor(){
    }
}
