import { Categoria } from './Categoria';
import { Stock } from './Stock';
import { Imagen } from './Imagen';

export class Producto {

    id: number;
    nombre: string;
    precioVenta: number;
    enOferta: boolean;
    peso: number;
    activo: boolean;
    destacado: boolean;
    descuento: number;
    descripcion: string;
    marca: string;

    categoria: Categoria;
    stocks: Stock[];
    imagenes: Imagen[];

    constructor(){
    }

}
