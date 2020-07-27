import { Component, OnInit, Input } from '@angular/core';

// Servicios
import { ArticuloService } from '../../../services/articulo.service';
import { CategoriaService } from '../../../services/categoria.service';
import { TalleService } from '../../../services/talle.service';
// Modelo
import { ArticuloModel } from '../../../models/articulo.model';
import { CategoriaModel } from '../../../models/categoria.model';
import { TalleModel } from '../../../models/talle.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private DESDE = 0;
  private CANTIDAD = 10;

  @Input() filtroPrecioHasta: number;
  @Input() filtroCategoria: number;
  @Input() filtroTalle: string;

  articulos: ArticuloModel[] = [];
  articulosFiltrados: ArticuloModel[] = [];
  categorias: CategoriaModel[] = [];
  talles: TalleModel[] = [];

  constructor(private articuloService: ArticuloService,
              private categoriaService: CategoriaService,
              private talleService: TalleService ) {

    // Cargo los articulos destacados 
    this.articuloService.getArticulosDestacados(1, 1).subscribe( resp => {
      this.articulos = resp;
    });

    // Cargo las categorias para el panel de filtros
    this.categoriaService.getCategorias().subscribe( resp => {
      this.categorias = resp;
    });

    // Cargo los talles para el panel de filtros
    this.talleService.getTalles().subscribe( resp => {
      this.talles = resp;
    });

    this.filtroPrecioHasta = 5000;

  }

  ngOnInit(): void {

  }

  selectFiltro(id: number) {
    this.filtroCategoria = id;
  }

  selectTalle(talle: string) {
    this.filtroTalle = talle;
  }

  buscar(): void{
    if(this.filtroCategoria  == undefined){
      this.filtroCategoria = -1;
    }

    if(this.filtroTalle  == undefined){
      this.filtroTalle = '-';
    }

    this.articuloService.getArticulosPorFiltros(this.filtroCategoria, this.filtroPrecioHasta, this.filtroTalle, 10, 0).subscribe( resp => {
      this.articulosFiltrados = resp;
    });

  }



}
