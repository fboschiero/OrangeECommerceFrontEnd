import { Component, Input } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { OrdenCompra } from '../../../modelsBD/OrdenCompra';
import { CarritoService } from 'src/app/services/carrito.service';
import Swal from 'sweetalert2';
import { Usuario } from '../../../modelsBD/Usuario';

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})



export class NavbarComponent  {

  @Input() verHeader: boolean;

  nombreUsuario: string;

  carrito: OrdenCompra;

  API_URL_IMAGE = environment.API_URL_IMAGE;

  constructor(private loginServices: LoginService, private carritoService: CarritoService) {
    this.carrito = JSON.parse(localStorage.getItem('carrito'));
    if(!this.carrito){
      this.carrito = new OrdenCompra();
      this.carrito.fecha = new Date();
      this.carrito.numero = this.carrito.fecha.getTime()+"";
      this.carrito.items = [];
      localStorage.setItem('carrito', JSON.stringify(this.carrito));
    }

    this.verHeader = true;
   }

  
  estaLogueado(){
    if (this.loginServices.estaAutenticado()) {

      const datosUsuario: Usuario = JSON.parse(localStorage.getItem('usuario'));
      const rol = localStorage.getItem('tipo');
      
      this.nombreUsuario = datosUsuario.nombre;
      return true;
      
    }
    return false;
  }

  estaLogueadoAdmin(){
    if (this.loginServices.estaAutenticado()) {

      const datosUsuario: Usuario = JSON.parse(localStorage.getItem('usuario'));
      const rol = localStorage.getItem('tipo');
      
      if(rol === 'ADMIN'){
        this.nombreUsuario = datosUsuario.nombre;
        return true;
      }
    }
    return false;
  }

  salir() {
    this.loginServices.logout();
  }

  eliminar(indice: number){
    console.log('eliminando: ' + indice)
    // Lo elimino de la base
    this.carritoService.eliminarArticulo(indice, this.carrito.items[indice]).subscribe( resp => {
      
      if(resp["ok"] == false){
        Swal.fire({
          allowOutsideClick: true,
          icon: 'error',
          text: 'El articulo no pudo ser borrado del carrito: ' + resp["err"],
          title: 'Carrito'
        });
        return;
      
      }  else {

        /*Swal.fire({
          allowOutsideClick: true,
          icon: 'success',
          text: 'El articulo fue eliminado del carrito.',
          title: 'Carrito'
        });*/
        
        window.location.reload();
      }
    });
   
  }

  hayDatos(){
    if(!this.carrito){
      return false;
    }
    if(this.carrito.items.length > 0){
      return true;
    }
    return false;
  }

}
