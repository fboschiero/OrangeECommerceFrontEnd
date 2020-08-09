import { Component, OnInit, Input } from '@angular/core';

// Servicios
import { ArticuloService } from '../../../services/articulo.service';

// Modelos
import { ArticuloModel } from '../../../models/articulo.model';
import { Categoria } from 'src/app/modelsBD/Categoria';
import { TalleModel } from '../../../../../../../../Downloads/respaldo/src/app/models/talle.model';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  @Input() filtroPrecioHasta: number;
  @Input() filtroCategoria: number;
  @Input() filtroTalle: string;

  articulos: ArticuloModel[] = [];
  categorias: Categoria[];
  talles: TalleModel[];

  constructor(private articuloService: ArticuloService) {
    this.filtroPrecioHasta = 5000;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    window.scrollTo(0, 0);
  }

  selectFiltro(id: number) {
    this.filtroCategoria = id;
  }

  selectTalle(talle: string) {
    this.filtroTalle = talle;
  }

  buscar(): void{

    (<HTMLElement>document.querySelector('#my-overlay')).style.display = '';

    if(this.filtroCategoria  == undefined){
      this.filtroCategoria = -1;
    }

    if(this.filtroTalle  == undefined){
      this.filtroTalle = '-';
    }

    this.articuloService.getArticulosPorFiltros(this.filtroCategoria, this.filtroPrecioHasta, this.filtroTalle, 10, 0).subscribe( resp => {
      this.articulos = resp;
    });

    (<HTMLElement>document.querySelector('#my-overlay')).style.display = 'none';

  }

}
