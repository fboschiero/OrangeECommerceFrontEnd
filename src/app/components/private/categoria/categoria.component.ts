import { Component, OnInit } from '@angular/core';
//import Swal from 'sweetalert2';
import { NgForm, FormsModule } from '@angular/forms';
import { CategoriaService } from '../../../services/categoria.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})

export class CategoriaComponent {

  constructor(public categoriaService: CategoriaService){

  }

  selectedFile: File = null;
  fd = new FormData();

  createFormData(event) {
    this.selectedFile = <File>event.target.files[0];
    this.fd.append('file', this.selectedFile, this.selectedFile.name);
  }

  saveFormCategoria(form: NgForm) {

    this.fd.append('body', form.value);
console.log(form.controls['descripcion']);

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
