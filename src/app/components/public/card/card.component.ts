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

  API_URL_IMAGE = environment.API_URL_IMAGE;

  constructor() {
    this.chiquito = false;
  }

  ngOnInit(): void {

  }

}
