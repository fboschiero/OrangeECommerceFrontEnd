import { Component, OnInit } from '@angular/core';
import { Orden } from '../../../models/Orden';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css']
})
export class CompraComponent implements OnInit {

  orden: Orden;

  constructor() { 

    this.orden = JSON.parse(localStorage.getItem('orden'));

  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    window.scrollTo(0, 0);
  }

  getSubtotal(){
    let suma = 0;
    for(let i=0; i<this.orden.carrito.items.length; i++){
      suma = suma + this.orden.carrito.items[i].precio * this.orden.carrito.items[i].cantidad;
    }
    return suma;
  }

  getFormaDePagoSring(){
    if(this.orden.formaDePago === 1){
      return 'Transferencia Bancaria';
    }
    if(this.orden.formaDePago === 2){
      return 'Giro Abitab o RedPagos';
    }
    if(this.orden.formaDePago === 3){
      return 'MercadoPago';
    }
  }

}
