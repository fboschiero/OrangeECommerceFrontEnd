import { Component, OnInit, Input } from '@angular/core';
import { ArticuloService } from '../../../services/articulo.service';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.css']
})
export class ArticulosComponent implements OnInit {

  private DESDE = 0;
  private CANTIDAD = 10;

  @Input() items: any[] = [];
  constructor(private articuloService: ArticuloService ) { }

  ngOnInit(): void {
  }

  getArticulos(){
    return this.articuloService.getArticulos(this.CANTIDAD, this.DESDE).subscribe;
  }

}
