import { Component, OnInit, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { ArticuloService } from '../../../services/articulo.service';
import Swal from 'sweetalert2';
import { CategoriaModel } from 'src/app/models/categoria.model';
import { CategoriaService } from '../../../services/categoria.service';
import { ImagenModel } from '../../../models/imagen.model';
import { Observable } from 'rxjs';
import { Categoria } from 'src/app/modelsBD/Categoria';
import { environment } from '../../../../environments/environment';

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

  @Input() filtroCategoria: number;
 
  listaCategorias: Categoria[] = [];
  imagenes = [];

  fd = new FormData();
  selectedFile: File = null;
  visible: boolean = false;

  API_URL_IMAGE = environment.API_URL_IMAGE;

  constructor(public articuloServices: ArticuloService, public categoriaService: CategoriaService) {
     // Cargo las categorias para el panel de filtros
     this.categoriaService.getCategorias().subscribe( resp => {
      this.listaCategorias = resp;
    });
  }

  selectFiltro(id: number) {
    this.filtroCategoria = id;
    console.log(this.filtroCategoria);
  }

  agregarArticuloNuevo(form: NgForm){
    this.fd.append('body', JSON.stringify(form));
    this.fd.append('categoriaId', JSON.stringify(this.filtroCategoria));

    console.log(this.fd.getAll('file'));

    this.articuloServices.guardarArticulo(this.fd).subscribe(() => {

      Swal.fire({
         allowOutsideClick: true,
         icon: 'info',
         text: 'Se guardo correctamente',
         title: 'Articulo'
       });

       this.fd.delete('file');
       this.fd.delete('body');
    });
  }

  getArticuloAModificar(articuloId){

    console.log('Modificar articulo id ' + articuloId);

    this.articuloServices.getArticuloById(articuloId).subscribe( resp => {
      
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
      this.imagenes = resp[0].imagenes;

      this.visible = true;
    });
  }

  modificarArticulo(form: NgForm){
   
    this.fd.append('body', JSON.stringify(form));
    this.fd.append('categoriaId', JSON.stringify(this.filtroCategoria));

    console.log(this.fd.getAll('file'));

    this.articuloServices.modificarArticulo(this.fd).subscribe(() => {

      Swal.fire({
         allowOutsideClick: true,
         icon: 'info',
         text: 'Se guardo correctamente',
         title: 'Articulo'
       });

       this.fd.delete('file');
       this.fd.delete('body');
    });
  }

  borrarImagen(id, url){

    this.articuloServices.borrarImagen(id, url).subscribe(() => {

      Swal.fire({
         allowOutsideClick: true,
         icon: 'info',
         text: 'Se borro correctamente la imagen',
         title: 'Imagen articulo'
       });
    });

  }

  createFormData(event) {
    //Cantidad de img subidas
    let ins = event.target.files.length;
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
