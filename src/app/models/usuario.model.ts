export class UsuarioModel {

    nombre: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: string;
    activo: boolean;
    token: string;

    constructor(){
        this.role = 'USER_ROLE';
        this.activo = true;
    }
}
