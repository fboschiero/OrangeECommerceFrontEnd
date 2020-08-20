import { Component, OnInit } from '@angular/core';
import { OrdenCompra } from '../../../modelsBD/OrdenCompra';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css']
})
export class CompraComponent implements OnInit {

  orden: OrdenCompra;

  constructor() { 

    this.orden = JSON.parse(localStorage.getItem('orden'));

  }

  ngOnInit(): void {
  }

  getSubtotal(){
    let suma = 0;
    for(let i=0; i<this.orden.items.length; i++){
      suma = suma + this.orden.items[i].precio * this.orden.items[i].cantidad;
    }
    return suma;
  }

  getFormaDePagoSring(){
    if(this.orden.pago.tipoPago === 1){
      return 'Transferencia Bancaria';
    }
    if(this.orden.pago.tipoPago === 2){
      return 'Giro Abitab o RedPagos';
    }
    if(this.orden.pago.tipoPago === 3){
      return 'MercadoPago';
    }
  }

}
