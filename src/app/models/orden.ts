import { OrdenCompra } from '../modelsBD/OrdenCompra';

export class Orden {
    carrito_id: string;
    carrito: OrdenCompra;
    formaDePago: number;
    fecha: Date;
    form: any;
    constructor(){
    }
}