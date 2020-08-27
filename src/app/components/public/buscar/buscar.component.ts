import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Servicios
import { ArticuloService } from '../../../services/articulo.service';
import { CategoriaService } from '../../../services/categoria.service';
import { TalleService } from '../../../services/talle.service';
import { ColorService } from '../../../services/color.service';

// Modelos
import { Producto } from '../../../modelsBD/Producto';
import { Categoria } from 'src/app/modelsBD/Categoria';
import { CodigueraTalle } from '../../../modelsBD/CodigueraTalle';
import { CodigueraColor } from '../../../modelsBD/CodigueraColor';

import { environment } from '../../../../environments/environment.prod';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  @Input() filtroPrecioHasta: number;
  @Input() ofertas: boolean;
  @Input() destacados: boolean;
  @Input() ordenarPor: number;
  @Input() activo: boolean;

  articulos: Producto[] = [];
  categorias: Categoria[] = [];
  talles: CodigueraTalle[] = [];
  colores: CodigueraColor[] = [];

  private DESDE = 0;
  private HASTA = 10;

  fin: boolean; 
  entroPor: string;

  PATH_IMAGENES = environment.PATH_IMAGENES;

  constructor(private articuloService: ArticuloService,
              private categoriaService: CategoriaService,
              private talleService: TalleService,
              private colorService: ColorService,
              private _Activatedroute:ActivatedRoute) {
    this.filtroPrecioHasta = 5000;

    this.entroPor = undefined;      
    
    // Cargo las categorias para el panel de filtros
    this.categoriaService.getCategorias().subscribe( resp => {
      this.categorias = resp;   
    });
    
    // Cargo los talles para el panel de filtros
    this.talleService.getTalles().subscribe( resp => {
      this.talles = resp;
    });

     // Cargo los colores para el panel de filtros
     this.colorService.getColores().subscribe( resp => {
      this.colores = resp;
    });

    const of = this._Activatedroute.snapshot.queryParamMap.get("ofertas");
    if(of != undefined && of == 'true'){
      this.ofertas = true;
      this.entroPor = 'Ofertas';
    }
    const des = this._Activatedroute.snapshot.queryParamMap.get("destacados");
    if(des != undefined && des == 'true'){
      this.destacados = true;
      this.entroPor = 'Destacados';
    }

    if(this.entroPor != undefined){
      this.buscar(false);
    } else {
      // Entre por el buscar, abro los filtros
      //console.log(document.querySelector('#collapse1'));
      //(<HTMLElement>document.querySelector('#collapse1')).collapse('show')

     
    }   
    //console.log(document.querySelector('#collapse1'));
    this.fin = false;
    
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    window.scrollTo(0, 0);
  }

  buscar(reset: boolean ): void {
    
    if(reset){
      this.articulos = [];
      this.DESDE = 0;
      this.HASTA = 10;
    }

    let categoriasSeleccionadas: Number[] = [];
    if(this.categorias.length == 0){
      categoriasSeleccionadas = undefined;
      
    } else {
      categoriasSeleccionadas = [];
      for (let i = 0; i < this.categorias.length; i++) {
        var cat = this.categorias[i];
        if(cat.seleccionada == true){
          categoriasSeleccionadas.push(cat.id);
        }
      }
      if(categoriasSeleccionadas.length == 0){
        categoriasSeleccionadas = undefined;
      }
    }    
    //console.log(categoriasSeleccionadas);

    let tallesSeleccionados: String[] = [];
    if(this.talles.length == 0){
      tallesSeleccionados = undefined;
    } else {
      for (let i = 0; i < this.talles.length; i++) {
        var talle = this.talles[i];
        if(talle.seleccionado == true){
          tallesSeleccionados.push("'"+talle.valor+"'");
        }
        if(tallesSeleccionados.length == 0){
          tallesSeleccionados = undefined;
        }
      }
    }    

    let coloresSeleccionados: String[] = [];
    if(this.colores.length == 0){
      coloresSeleccionados = undefined;
    } else {
      for (let i = 0; i < this.colores.length; i++) {
        var color = this.colores[i];
        if(color.seleccionado == true){
          coloresSeleccionados.push("'"+color.valor+"'");
        }
      }
      if(coloresSeleccionados.length == 0){
        coloresSeleccionados = undefined;
      }
    }
    
    this.articuloService.getArticulosPorFiltros(categoriasSeleccionadas, tallesSeleccionados, coloresSeleccionados, this.filtroPrecioHasta, this.ofertas, this.destacados, this.DESDE, this.HASTA, this.ordenarPor, this.activo).subscribe( resp => {
      
      if(resp.length == 0){
        this.fin = true;
      }

      if(this.articulos.length > 0){
        
        for(var i = 0; i < resp.length ; i++){
          this.articulos.push(resp[i]);
        }
      
      } else {
        this.articulos = resp;
      }

      
      
    });

  }

  onScroll(): void{
    
    this.DESDE = this.HASTA;
    this.HASTA = this.HASTA + 1;
    this.buscar(false);
  }

  selectOrden(id: number) {
    this.ordenarPor = id;
  }

}
