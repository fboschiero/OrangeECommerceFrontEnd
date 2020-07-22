import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { LoginService } from '../../../services/login.service';
import { UsuarioModel } from '../../../models/usuario.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  nombreUsuario: string;

  constructor(private loginServices: LoginService) { }

  ngOnInit(): void {
  }

  estaLogueado(){
    if (this.loginServices.estaAutenticado()) {

      const datosUsuario: UsuarioModel = JSON.parse(localStorage.getItem('usuario'));
      this.nombreUsuario = datosUsuario.nombre;
      return true;
    }
    return false;
  }

  salir() {
    this.loginServices.logout();
  }

}
