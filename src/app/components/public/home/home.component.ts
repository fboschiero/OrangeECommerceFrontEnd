import { Component, OnInit, Input } from '@angular/core';
import { ArticuloService } from '../../../services/articulo.service';
import { ArticuloModel } from '../../../models/articulo.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private DESDE = 0;
  private CANTIDAD = 10;

  articulos: ArticuloModel[] = [];

  constructor(private articuloService: ArticuloService ) {
    this.articuloService.getArticulos(1, 1).subscribe( resp => {
      this.articulos = resp;
    });
  }

  ngOnInit(): void {

  }



}
