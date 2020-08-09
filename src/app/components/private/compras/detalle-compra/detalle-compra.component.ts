import { Component, OnInit, Input } from '@angular/core';
import { OrdenCompra } from 'src/app/modelsBD/OrdenCompra';
import { ComprasService } from 'src/app/services/compras.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle-compra',
  templateUrl: './detalle-compra.component.html',
  styleUrls: ['./detalle-compra.component.css']
})
export class DetalleCompraComponent implements OnInit {

  ordenCompra: OrdenCompra;
  
  constructor(private comprasService: ComprasService,
              private _Activatedroute:ActivatedRoute) {
    
    const index = this._Activatedroute.snapshot.paramMap.get("index");

    this.ordenCompra = comprasService.getOrdenCompra(index);
    
  }
  
  ngOnInit(): void { }

}
