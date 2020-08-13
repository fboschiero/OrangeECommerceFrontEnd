import { Component, OnInit } from '@angular/core';
import { OrdenCompra } from '../../../modelsBD/OrdenCompra';
import { CarritoService } from 'src/app/services/carrito.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})

export class CarritoComponent implements OnInit {

  carrito: OrdenCompra;

  constructor(private carritoService: CarritoService) {
    this.carrito = JSON.parse(localStorage.getItem('carrito'));
  }

  ngOnInit(): void {
  }

  eliminar(indice: number){

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
