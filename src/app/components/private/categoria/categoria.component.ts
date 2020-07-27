import { Component, OnInit, ɵɵresolveBody } from '@angular/core';
// import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { NgForm, FormsModule } from '@angular/forms';
import { CategoriaService } from '../../../services/categoria.service';
import Swal from 'sweetalert2';
import { CategoriaModel } from 'src/app/models/categoria.model';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})

export class CategoriaComponent implements OnInit {

  constructor(public categoriaService: CategoriaService){
    this.getCategoria();
  }

  listaCategorias: CategoriaModel[] = [];
  selectedFile: File = null;
  fd = new FormData();
  visible: boolean = false;

  ngOnInit() {
    this.getCategoria();
  }

  getCategoria(){
    this.listaCategorias.push.apply(this.categoriaService.getCategorias());
  }

  agregarCategoriaNueva(){
    
    if(this.visible){
      return this.visible = false;
    }
    return this.visible = true;
  }

  createFormData(event) {
    this.selectedFile = <File>event.target.files[0];
    this.fd.append('file', this.selectedFile, this.selectedFile.name);
  }

  saveFormCategoria(form: NgForm) {

    this.fd.append('body', JSON.stringify(form));

    this.categoriaService.saveCategoria(this.fd).subscribe(() => {

       Swal.fire({
         allowOutsideClick: true,
         icon: 'info',
         text: 'Mensaje enviado correctamente',
         title: 'Formulario de contacto'
       });
    });

  }
}
