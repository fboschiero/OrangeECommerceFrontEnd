import { Component, OnInit, Input } from '@angular/core';
import { ArticuloModel } from '../../../models/articulo.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() articulo: ArticuloModel;

  constructor() {console.log(this.articulo); }

  ngOnInit(): void {

  }

}
