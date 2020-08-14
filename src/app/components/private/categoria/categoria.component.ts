import { Component, OnInit, Input } from '@angular/core';
// import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { NgForm, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { CategoriaService } from '../../../services/categoria.service';
import Swal from 'sweetalert2';
import { Categoria } from 'src/app/modelsBD/Categoria';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})

export class CategoriaComponent implements OnInit {

  @Input() filtroCategoria: number;

  listaCategorias: Categoria[] = [];
  selectedFile: File = null;
  fd = new FormData();
  visible: boolean = false;

  formCategoria: FormGroup;

  constructor(public categoriaService: CategoriaService){
    // Cargo las categorias para el panel de filtros
    this.categoriaService.getCategorias().subscribe( resp => {
      this.listaCategorias = resp;
    });
  }

  ngOnInit() {

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
         text: 'Se guardo correctamente',
         title: 'Categoria'
       });
    });
  }

  selectFiltro(id: number) {
    this.filtroCategoria = id;
  }

  modificarCategoria(): void{

    let form = new FormGroup({
      nombre: new FormControl('Gonza')
    });
    
    console.log(form);
    this.categoriaService.eliminarCategoria(this.filtroCategoria).subscribe( resp => {
    
      
    });

  }
}
