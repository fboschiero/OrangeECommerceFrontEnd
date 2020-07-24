import { CategoriaModel } from './categoria.model';
import { Talle } from './talle.model';
import { Imagen } from './imagen.model';

export class ArticuloModel {
    id: string;
    nombre: string;
    descripcion: string;
    precio: number;
    enOferta: boolean;
    peso: number;
    activo: boolean;
    destacado: boolean;
    descuento: number;
    imagenes: Imagen[];

    constructor(){
        this.activo = true;
    }
}
