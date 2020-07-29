import { CategoriaModel } from './categoria.model';
import { TalleModel } from './talle.model';
import { ImagenModel } from './imagen.model';
import { ColorModel } from './color.model';
import { StockModel } from './stock.model';


export class ArticuloModel {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    enOferta: boolean;
    peso: number;
    activo: boolean;
    destacado: boolean;
    descuento: number;
    imagenes: ImagenModel[];
    stocks: StockModel[];

    constructor(){
        this.activo = true;
    }
}
