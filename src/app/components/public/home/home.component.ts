import { Component, OnInit, Input } from '@angular/core';
import { ArticuloService } from '../../../services/articulo.service';
import { CategoriaService } from '../../../services/categoria.service';
import { ArticuloModel } from '../../../models/articulo.model';
import { CategoriaModel } from '../../../models/categoria.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private DESDE = 0;
  private CANTIDAD = 10;

  @Input() filtroPrecio: number;
  @Input() filtroCategoria: string;

  articulos: ArticuloModel[] = [];
  categorias: CategoriaModel[] = [];

  constructor(private articuloService: ArticuloService,
              private categoriaService: CategoriaService ) {

    this.articuloService.getArticulosDestacados(1, 1).subscribe( resp => {
      this.articulos = resp;
    });

    this.categoriaService.getCategorias().subscribe( resp => {
      this.categorias = resp;
    });

    this.filtroPrecio = 5000;
  }

  ngOnInit(): void {

  }

  selectFiltro(id: string) {
    this.filtroCategoria = id;
  }

  prueba(): void{
    console.log(this.filtroCategoria);

  }



}
