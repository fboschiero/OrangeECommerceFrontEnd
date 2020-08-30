import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ArticuloService } from '../../../../services/articulo.service';
import Swal from 'sweetalert2';
import { CategoriaService } from '../../../../services/categoria.service';
import { Categoria } from 'src/app/modelsBD/Categoria';
import { environment } from '../../../../../environments/environment';
import { CodigueraTalle } from '../../../../modelsBD/CodigueraTalle';
import { CodigueraColor } from '../../../../modelsBD/CodigueraColor';
import { TalleService } from '../../../../services/talle.service';
import { ColorService } from '../../../../services/color.service';

@Component({
  selector: 'app-abm-articulo',
  templateUrl: './abm-articulo.component.html',
  styleUrls: ['./abm-articulo.component.css']
})
export class AbmArticuloComponent {

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
  talles: CodigueraTalle[] = [];
  colores: CodigueraColor[] = [];
  imagenes = [];
  agregoImg:boolean = false;

  fd;
  visible: boolean = false;

  API_URL_IMAGE = environment.API_URL_IMAGE;

  constructor(public articuloServices: ArticuloService, 
              public categoriaService: CategoriaService, 
              private talleService: TalleService,
              private colorService: ColorService) {
     
     // Cargo las categorias para el panel de filtros
     this.categoriaService.getCategorias().subscribe( resp => {
      this.listaCategorias = resp;
    });

    // Cargo los talles para el panel de filtros
    this.talleService.getTalles().subscribe( resp => {
      this.talles = resp;
    });

     // Cargo los colores para el panel de filtros
     this.colorService.getColores().subscribe( resp => {
      this.colores = resp;
    });
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

  agregarArticuloNuevo(form: NgForm){

    if (this.filtroCategoria === undefined ||  this.filtroTalle === undefined || this.filtroColor === undefined || this.agregoImg === false){
      Swal.fire({
        allowOutsideClick: true,
        icon: 'info',
        text: 'Debe ingresar una imagen',
        title: 'Articulo'
      });

    }else{

      this.fd.append('body', JSON.stringify(form));
      this.fd.append('categoriaId', JSON.stringify(this.filtroCategoria));
      this.fd.append('talle', JSON.stringify(this.filtroTalle));
      this.fd.append('color', JSON.stringify(this.filtroColor));

      this.articuloServices.guardarArticulo(this.fd).subscribe(() => {
        
        this.myInputVariable.nativeElement.value = "";
  
        Swal.fire({
           allowOutsideClick: true,
           icon: 'info',
           text: 'Se guardo correctamente',
           title: 'Articulo'
        });
        window.setTimeout(function(){
          location.reload();
      } ,1800);
      });
    }
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

  agregarArticuloNuevoBoolean(){
    if(this.visible){
      return this.visible = false;
    }
    return this.visible = true;
  }
}
