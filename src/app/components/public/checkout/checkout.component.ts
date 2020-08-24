import { Component, OnInit } from '@angular/core';
import { OrdenCompra } from '../../../modelsBD/OrdenCompra';
import { Orden } from '../../../models/orden';
import { CarritoService } from 'src/app/services/carrito.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import {Router} from '@angular/router'

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  carrito: OrdenCompra;

  formaDePago: number;

  constructor(private carritoService: CarritoService,
              private router: Router) {
    this.carrito = JSON.parse(localStorage.getItem('carrito'));
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    window.scrollTo(0, 0);
  }

  confirmarCompra(form: NgForm) {
    
    console.log(form);
    
    if(!this.formaDePago){
      Swal.fire({
        allowOutsideClick: true,
        icon: 'error',
        text: 'Debes ingresar la forma de pago',
        title: 'Confirmación de compra'
      });
      return;
    }

    let orden = new Orden();
    orden.carrito_id = this.carrito.numero;
    orden.carrito = this.carrito;
    orden.formaDePago = this.formaDePago;
    orden.fecha = new Date();
    orden.form = form;

    this.carritoService.confirmarCompra(orden)
      .subscribe( resp => {      

        if(resp["ok"] == true){

          localStorage.setItem('orden', JSON.stringify(orden));  
        
          localStorage.removeItem('carrito');

          Swal.fire({
            allowOutsideClick: true,
            icon: 'info',
            text: 'La compra se confirmo correctamente',
            title: 'Compra'
          });
        }

        this.router.navigate(['/compra']);

    });       

  }

  getSubtotal(){
    let suma = 0;
    for(let i=0; i<this.carrito.items.length; i++){
      suma = suma + this.carrito.items[i].precio * this.carrito.items[i].cantidad;
    }
    return suma;
  }

  seleccionarFormaDePago(forma: number){
    this.formaDePago = forma;
  }

  

}
