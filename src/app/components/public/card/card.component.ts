import { Component, OnInit, Input } from '@angular/core';
import { Producto } from '../../../modelsBD/Producto';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() articulo: Producto;
  @Input() chiquito: boolean;

  constructor() {
    this.chiquito = false;
  }

  ngOnInit(): void {

  }

}
