import { Component, OnInit } from '@angular/core';
import { ComprasService } from 'src/app/services/compras.service';
import { OrdenCompra } from 'src/app/modelsBD/OrdenCompra';

@Component({
  selector: 'app-mis-compras',
  templateUrl: './mis-compras.component.html',
  styleUrls: ['./mis-compras.component.css']
})
export class MisComprasComponent implements OnInit {

  listaCompras: OrdenCompra[] = [];

  constructor(private comprasService: ComprasService) {

    this.listaCompras = this.comprasService.obtenerCompras('p@p', new Date(), new Date());

  }

  ngOnInit(): void {
  }

}
