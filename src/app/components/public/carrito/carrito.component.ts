import { Component, OnInit } from '@angular/core';
import { OrdenCompra } from '../../../modelsBD/OrdenCompra';
import { CarritoService } from 'src/app/services/carrito.service';
import Swal from 'sweetalert2';

import { environment } from '../../../../environments/environment.prod';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})

export class CarritoComponent implements OnInit {

  carrito: OrdenCompra;

  API_URL_IMAGE = environment.API_URL_IMAGE;

  constructor(private carritoService: CarritoService) {
    this.carrito = JSON.parse(localStorage.getItem('carrito'));
  }

  ngOnInit(): void {
  }

  eliminar(id: number, indice: number){

    console.log('indice ' + JSON.stringify(indice));
    console.log('carrito item indice ' + JSON.stringify(this.carrito.items[indice]));

    // Lo elimino de la base
    this.carritoService.eliminarArticulo(id, this.carrito.items[indice]).subscribe( resp => {
      
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

  getSubtotal(){
    let suma = 0;
    for(let i=0; i<this.carrito.items.length; i++){
      suma = suma + this.carrito.items[i].precio * this.carrito.items[i].cantidad;
    }
    return suma;
  }

  ngAfterViewInit() {
    window.scrollTo(0, 0);
  }

}
