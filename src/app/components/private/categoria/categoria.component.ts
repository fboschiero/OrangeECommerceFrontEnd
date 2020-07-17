import { Component, OnInit } from '@angular/core';
//import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { CategoriaService } from '../../../services/categoria.service';


@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})

export class CategoriaComponent {

  constructor(public categoriaService: CategoriaService){

  }

  saveFormCategoria(form: NgForm) {

    this.categoriaService.saveCategoria(form).subscribe(() => {
      // Swal.fire({
      //   allowOutsideClick: true,
      //   icon: 'info',
      //   text: 'Mensaje enviado correctamente',
      //   title: 'Formulario de contacto'
      // });
    });

  }
}
