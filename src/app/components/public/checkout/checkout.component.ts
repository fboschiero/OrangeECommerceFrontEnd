import { Component, OnInit } from '@angular/core';
import { Carrito } from '../../../models/carrito';
import { CarritoService } from 'src/app/services/carrito.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  carrito: Carrito;

  constructor(private carritoService: CarritoService) {
    this.carrito = JSON.parse(localStorage.getItem('carrito'));
  }

  ngOnInit(): void {
  }

  getSubtotal(){
    let suma = 0;
    for(let i=0; i<this.carrito.items.length; i++){
      suma = suma + this.carrito.items[i].precio * this.carrito.items[i].cantidad;
    }
    return suma;
  }

}
