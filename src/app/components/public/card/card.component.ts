import { Component, OnInit, Input } from '@angular/core';
import { ArticuloModel } from '../../../models/articulo.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() articulo: ArticuloModel;
  @Input() chiquito: boolean;

  constructor() {
    this.chiquito = false;
  }

  ngOnInit(): void {

  }

}
