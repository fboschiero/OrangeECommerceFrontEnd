import { Item } from './item';

export class Carrito {
    id: number;
    numero: string;
    impuestos: number;
    fecha: Date;
    estado: number;
    items: Item[];

    constructor(){
    }

}
