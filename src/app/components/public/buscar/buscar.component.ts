import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Servicios
import { ArticuloService } from '../../../services/articulo.service';

// Modelos
import { ArticuloModel } from '../../../models/articulo.model';
import { Categoria } from 'src/app/modelsBD/Categoria';
import { TalleModel } from '../../../models/talle.model';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  @Input() filtroPrecioHasta: number;
  @Input() filtroCategoria: number;
  @Input() filtroTalle: string;
  @Input() ofertas: boolean;
  @Input() destacados: boolean;

  articulos: ArticuloModel[] = [];
  categorias: Categoria[];
  talles: TalleModel[];

  private DESDE = 0;
  private HASTA = 1;

  fin: boolean; 

  constructor(private articuloService: ArticuloService,
              private _Activatedroute:ActivatedRoute) {
    this.filtroPrecioHasta = 5000;

    const of = this._Activatedroute.snapshot.queryParamMap.get("ofertas");
    if(of != undefined && of == 'true'){
      this.ofertas = true;
    }
    const des = this._Activatedroute.snapshot.queryParamMap.get("destacados");
    if(des != undefined && des == 'true'){
      this.destacados = true;
    }

    this.fin = false;
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

    this.articuloService.getArticulosPorFiltros(this.filtroCategoria, this.filtroPrecioHasta, this.filtroTalle, this.ofertas, this.destacados, this.DESDE, this.HASTA).subscribe( resp => {
      
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

      console.log(this.articulos.length);
      
    });

    (<HTMLElement>document.querySelector('#my-overlay')).style.display = 'none';

  }

  onScroll(): void{
  
    this.DESDE = this.HASTA;
    console.log("Nuevo desde" + this.DESDE);
    this.HASTA = this.HASTA + 1;

    this.buscar();
  }

}
