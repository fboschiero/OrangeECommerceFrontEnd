import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { ArticuloService } from 'src/app/services/articulo.service';
import { CategoriaService } from '../../../../services/categoria.service';
import { TalleService } from '../../../../services/talle.service';
import { ColorService } from '../../../../services/color.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { Producto } from '../../../../modelsBD/Producto';
import { Categoria } from '../../../../modelsBD/Categoria';
import { CodigueraTalle } from '../../../../modelsBD/CodigueraTalle';
import { CodigueraColor } from '../../../../modelsBD/CodigueraColor';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-listado-articulos',
  templateUrl: './listado-articulos.component.html',
  styleUrls: ['./listado-articulos.component.css']
})
export class ListadoArticulosComponent implements OnInit {

  @Input() articuloId;
  @Input() nombreArt;
  @Input() descripcionArt;
  @Input() precioArt;
  @Input() activoArt;
  @Input() destacadoArt;
  @Input() enOfertaArt;
  @Input() descuentoArt;
  @Input() pesoArt;
  @Input() marcaArt;
  @Input() categoriaArt;
  @Input() img;

  //Talle - color - cantidad
  @Input() colorArt;
  @Input() talleArt;
  @Input() cantidadArt;
  
  @Input() filtroCategoria: number;
  @Input() filtroTalle: string;
  @Input() filtroColor: string;

  @ViewChild('file')
  myInputVariable: ElementRef;
  
  listaCategorias: Categoria[] = [];
  imagenes = [];
  agregoImg:boolean = false;

  fd;
  p: number = 1;
  visible: boolean = false;

  @Input() filtroPrecioHasta: number;
  @Input() ofertas: boolean;
  @Input() destacados: boolean;
  @Input() ordenarPor: number;
  @Input() activoCheck: boolean = true;

  articulos: Producto[] = [];
  categorias: Categoria[] = [];
  talles: CodigueraTalle[] = [];
  colores: CodigueraColor[] = [];

  API_URL_IMAGE = environment.API_URL_IMAGE;

  private DESDE = 0;
  private HASTA = 10;

  fin: boolean; 
  entroPor: string;

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
    
    this.articuloService.getArticulosPorFiltros(categoriasSeleccionadas, tallesSeleccionados, coloresSeleccionados, this.filtroPrecioHasta, this.ofertas, this.destacados, this.DESDE, this.HASTA, this.ordenarPor, this.activoCheck).subscribe( resp => {
      
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

  getArticuloAModificar(articuloId){

    this.articuloService.getArticuloById(articuloId).subscribe( resp => {

      this.articuloId = resp[0].id;
      this.nombreArt = resp[0].nombre;
      this.descripcionArt = resp[0].descripcion;
      this.precioArt = resp[0].precioVenta;
      this.activoArt = resp[0].activo;
      this.destacadoArt = resp[0].destacado;
      this.enOfertaArt = resp[0].enOferta;
      this.descuentoArt = resp[0].descuento;
      this.pesoArt = resp[0].peso;
      this.categoriaArt = resp[0].categoria;
      this.talleArt = resp[0].stocks[0].talle;
      this.colorArt = resp[0].stocks[0].color;
      this.cantidadArt = resp[0].stocks[0].cantidad;
      this.imagenes = resp[0].imagenes;

      this.visible = true;
    });
  }

  getImagenArticulo(articuloId){

    this.articuloService.getArticuloById(articuloId).subscribe( resp => {

      this.imagenes = resp[0].imagenes;
    });
  }

  modificarArticulo(form: NgForm){

    this.fd.append('body', JSON.stringify(form));
    this.fd.append('categoriaId', JSON.stringify(this.filtroCategoria));
    this.fd.append('talle', JSON.stringify(this.filtroTalle));
    this.fd.append('color', JSON.stringify(this.filtroColor));

    console.log(this.fd.getAll('file'));

    this.articuloService.modificarArticulo(this.fd).subscribe(() => {

      this.myInputVariable.nativeElement.value = "";

      Swal.fire({
         allowOutsideClick: true,
         icon: 'info',
         text: 'Se guardo correctamente',
         title: 'Articulo'
       });
    });
  }

  borrarImagen(id, url){

    this.articuloService.borrarImagen(id, url).subscribe(() => {

      Swal.fire({
         allowOutsideClick: true,
         icon: 'info',
         text: 'Se borro correctamente la imagen',
         title: 'Imagen articulo'
       });

    });

    window.location.reload();
  }

  createFormData(event) {
    //Cantidad de img subidas
    let ins = event.target.files.length;
    this.fd = new FormData();
    this.agregoImg = true;

    if(ins>5){
      Swal.fire({
        allowOutsideClick: true,
        icon: 'info',
        text: 'Solo se pueden ingresar 5 imagenes maximo por producto',
        title: 'Imagen articulo'
      });
    }else{
      for (var x = 0; x < ins; x++) {
        //Voy agregandolo al FormData para enviarlo al backend
        this.fd.append("file", <File>event.target.files[x]);
      }
    }
  }

  selectFiltro(id: number) {
    this.filtroCategoria = id;
    console.log(this.filtroCategoria);
  }

  selectFiltroTalle(id: string) {
    this.filtroTalle = id;
    console.log(this.filtroCategoria);
  }

  selectFiltroColor(id: string) {
    this.filtroColor = id;
    console.log(this.filtroCategoria);
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
