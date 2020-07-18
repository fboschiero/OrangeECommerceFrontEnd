export class CategoriaModel {

    id: string;
    nombre: string;
    descripcion: string;
    img: string;
    activo: boolean;

    constructor(){
        this.activo = true;
    }
}