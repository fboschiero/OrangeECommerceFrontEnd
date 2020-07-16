import { Categoria } from './categoria.model';
import { Talle } from './talle.model';

export class ArticuloModel {

    nombre: string;
    precio: number;
    img: string;
    imgDimensiones: string;
    categorias: Categoria[];
    talles: Talle[];
    stock: number;
    vendidos: number;
    oferta: boolean;
    peso: number;
    unidadDePeso: string;
    activo: boolean;
    articuloNuevo: boolean;
    descuento: number;
    coloresDisponibles: string;
    destacado: boolean;

    constructor(){
        this.articuloNuevo = true;
        this.activo = true;
    }
}
