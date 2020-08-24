import { Component, OnInit, Input } from '@angular/core';
import { Producto } from '../../../modelsBD/Producto';

import { environment } from '../../../../environments/environment.prod';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() articulo: Producto;
  @Input() chiquito: boolean;

  PATH_IMAGENES = environment.PATH_IMAGENES;

  constructor() {
    this.chiquito = false;
  }

  ngOnInit(): void {

  }

}
