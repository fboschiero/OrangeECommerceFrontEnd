import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { ArticuloService } from '../../../services/articulo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-abm-articulo',
  templateUrl: './abm-articulo.component.html',
  styleUrls: ['./abm-articulo.component.css']
})
export class AbmArticuloComponent implements OnInit {

  form: FormGroup;
  visible: boolean = false;
  selectedFile: File = null;
  fd = new FormData();

  constructor(public articuloServices: ArticuloService) {
  }

  ngOnInit(): void {
  }

  agregarArticuloNuevo(form: NgForm){
    this.fd.append('body', JSON.stringify(form));
    
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

  modificarArticulo(){}

  createFormData(event) {
    //Cantidad de img subidas
    let ins = event.target.files.length;
    for (var x = 0; x < ins; x++) {
      //Voy agregandolo al FormData para enviarlo al backend
      this.fd.append("file", <File>event.target.files[x]);
    }
  }

  agregarArticuloNuevoBoolean(){

    if(this.visible){
      return this.visible = false;
    }
    return this.visible = true;
  }
}
