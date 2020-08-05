import { OrdenCompra } from './OrdenCompra';
import { ListaDeseo } from './ListaDeseo';
export class Usuario {

    nombre: string;
    apellido: string;
    email: string;
    password: string;
    confirmPassword: string;
    celular: string;
    telefono: string;
    direccion: string;
    fechaCreado: Date;
    estado: number;
    rol: string;

    listaCompras: OrdenCompra[];
    listaDeseos: ListaDeseo[];

    constructor(){
    }

}
