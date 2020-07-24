import { Component, OnInit, ɵɵresolveBody } from '@angular/core';
import { CategoriaModel } from '../../../models/categoria.model';
import { HttpClient } from '@angular/common/http';
import { NgForm, FormsModule } from '@angular/forms';
import { CategoriaService } from '../../../services/categoria.service';
import Swal from 'sweetalert2';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})

export class CategoriaComponent implements OnInit{

  constructor(public categoriaService: CategoriaService){
    this.getCategoria();
  }

  listaCategorias: CategoriaModel[] = [];
  selectedFile: File = null;
  fd = new FormData();
  visible: boolean = false;

  ngOnInit() {
    
  }

  getCategoria(){
    this.categoriaService.getCategorias().subscribe( resp => {
      console.log(JSON.stringify(resp));
      this.listaCategorias = resp;
    });
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

    this.getCategoria();

    this.fd = new FormData();

  }
}
