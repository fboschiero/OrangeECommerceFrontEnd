import { Item } from './Item';
import { Pago } from './Pago';

export class OrdenCompra {

    numero: string;
    impuestos: number;
    fecha: Date;
    estado: number;

    items: Item[];
    pago: Pago;

    constructor(){
    }

}
