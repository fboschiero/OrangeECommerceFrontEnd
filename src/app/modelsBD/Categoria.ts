import { Imagen } from './Imagen';
export class Categoria {
    id: number;
    nombre: string;
    descripcion: string;
    activo: boolean;
    imagen: Imagen;
    seleccionada: boolean;

    constructor(){
    }

}
