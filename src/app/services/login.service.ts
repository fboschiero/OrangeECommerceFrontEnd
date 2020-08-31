import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { map } from 'rxjs/operators';
import { Usuario } from '../modelsBD/Usuario';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private API_URL = environment.API_URL;

  private TIEMPO_EXPIRA = 1800;

  usuarioLogueado: boolean;

  constructor(private http: HttpClient) {

    const user: Usuario = JSON.parse(localStorage.getItem('usuario'));

    if (user && user.nombre){
      this.usuarioLogueado  = true;
    } else {
      this.usuarioLogueado  = false;
    }
  }

  estaAutenticado(): boolean {

    const expira = Number(localStorage.getItem('expira'));
    if (!expira) {
      this.usuarioLogueado = false;
      return false;
    }

    const expiraDate = new Date();
    expiraDate.setTime(expira);


    if ( expiraDate > new Date() ) {

      // renuevo la expiración
      const hoy = new Date();
      hoy.setSeconds( hoy.getSeconds() + this.TIEMPO_EXPIRA );
      localStorage.setItem('expira', hoy.getTime().toString() );

      this.usuarioLogueado = true;
    } else {

      localStorage.removeItem('expira');
      localStorage.removeItem('usuario');
      this.usuarioLogueado = false;
    }

    return this.usuarioLogueado;
  }

  login(usuario: Usuario) {

    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };

    const email = usuario.email;
    const password = usuario.password;

    const body = JSON.stringify({ email, password });

    return this.http.post(`${ environment.API_URL }/signIn/`, body, httpOptions)
    .pipe(map(user => this.procesarUsuario(user, usuario)));

  }

  private procesarUsuario(user: object, usuario: Usuario) {

    console.log(user);
    
    if (user) {

      const userLocalStorage: Usuario = new Usuario();
      userLocalStorage.email = user['usuario'][0]['email'];
      userLocalStorage.nombre = user['usuario'][0]['nombre'];
      userLocalStorage.rol = user['usuario'][0]['rol'];

      localStorage.setItem('usuario', JSON.stringify(userLocalStorage));
      localStorage.setItem('tipo', user['usuario'][0]['rol']);

      this.usuarioLogueado = true;

      const hoy = new Date();
      hoy.setSeconds( hoy.getSeconds() + this.TIEMPO_EXPIRA );

      localStorage.setItem('expira', hoy.getTime().toString() );
    }

  }

  signUp(usuario: Usuario) {

    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };

    const nombre = usuario.nombre;
    const email = usuario.email;
    const password = usuario.password;
    const rol = usuario.rol;

    const body = JSON.stringify({ nombre, email, password, rol });

    return this.http.post(`${ environment.API_URL }/signUp/`, body, httpOptions)
    .pipe(map(user => {

      console.log('Nuevo usuario response: ' + JSON.stringify(user));

      if (user) {

        this.usuarioLogueado = true;
        localStorage.setItem('usuario', JSON.stringify(usuario));

        const hoy = new Date();
        hoy.setSeconds( this.TIEMPO_EXPIRA );

        localStorage.setItem('expira', hoy.getTime().toString() );

      }

      return user;

    }));

  }

  logout(){
    localStorage.removeItem('usuario');
    localStorage.removeItem('expira');
    localStorage.removeItem('tipo');
    this.usuarioLogueado = false;
  }
}
