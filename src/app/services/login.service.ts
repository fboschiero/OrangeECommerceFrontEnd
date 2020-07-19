import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UsuarioModel } from '../models/usuario.model';

import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private API_URL = environment.API_URL;

  usuarioLogueado: boolean;

  constructor(private http: HttpClient) {

    const user: UsuarioModel = JSON.parse(localStorage.getItem('usuario'));

    if (user && user.nombre){
      this.usuarioLogueado  = true;
    } else {
      this.usuarioLogueado  = false;
    }
  }

  estaAutenticado(): boolean{
    return this.usuarioLogueado;
  }

  login(usuario: UsuarioModel) {

    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };

    const email = usuario.email;
    const password = usuario.password;

    const body = JSON.stringify({ email, password });

    return this.http.post(`${ environment.API_URL }/signIn`, body, httpOptions)
    .pipe(map((user) => {

      console.log('login response: ' + JSON.stringify(user));

      if (user) {

        this.usuarioLogueado = true;
        usuario.nombre = user['usuario']['nombre'];
        localStorage.setItem('usuario', JSON.stringify(usuario));

      }

      return user;

    }));

  }

  signUp(usuario: UsuarioModel) {

    if (usuario.password.match(usuario.confirmPassword) === null) {
      console.log('No coinciden las contraseñas!');
      return;
    }

    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };

    const nombre = usuario.nombre;
    const email = usuario.email;
    const password = usuario.password;
    const role = usuario.role;

    const body = JSON.stringify({ nombre, email, password, role });
    console.log(body);

    return this.http.post(`${ environment.API_URL }/signUp`, body, httpOptions)
    .pipe(map(user => {

      console.log('Nuevo usuario response: ' + JSON.stringify(user));

      if (user) {

        this.usuarioLogueado = true;
        localStorage.setItem('usuario', JSON.stringify(usuario));

      }

      return user;

    }));

  }

  logout(){
    localStorage.removeItem('usuario');
    this.usuarioLogueado = false;
  }
}
