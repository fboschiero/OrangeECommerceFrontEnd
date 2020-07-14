import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private API_URL = environment.API_URL;

  usuarioLogueado: boolean;

  constructor(private http: HttpClient) {

    const estaLogueado = localStorage.getItem('estaLogueado');

    if (estaLogueado  === 'true'){
      this.usuarioLogueado  = true;
    } else {
      this.usuarioLogueado  = false;
    }
  }

  estaAutenticado(): boolean{
    console.log('Validando autenticacion de usuario', this.usuarioLogueado);
    return this.usuarioLogueado;
  }

  login(){
    // const body2 = 'body';
    // this.http.post(`${this.API_URL}/signIn`, body2);

    this.usuarioLogueado = true;
    console.log('Usuario logueado!');
    console.log('Validando autenticacion de usuario', this.usuarioLogueado);

    localStorage.setItem('estaLogueado', 'true');

    /*this.http.get('').subscribe(data => {
      console.log(data);
    }, (err) => {

    });*/
  }

  nuevoUsuario(userParam: string, passParam: string, eMailParam: string){

    const headers = new HttpHeaders({
      user: userParam,
      pass: passParam,
      eMail: eMailParam
    });
    this.http.post('', {headers}).subscribe(data => {
      console.log(data);
    });
  }
}
