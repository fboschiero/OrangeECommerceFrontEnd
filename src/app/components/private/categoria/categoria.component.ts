import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
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

  @Input() categoria: Categoria;
  @Input() catNombre: String;
  @Input() catDescripcion: String;
  @Input() catActivo: boolean;
  @Input() catId: number;

  listaCategorias: Categoria[] = [];
  visible: boolean = false;


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

  saveFormCategoria(form: NgForm) {

    this.categoriaService.saveCategoria(form).subscribe(() => {

       Swal.fire({
         allowOutsideClick: true,
         icon: 'info',
         text: 'Se guardo correctamente',
         title: 'Categoria'
       });
    });
  }

  modificarCategoria(form){

    this.categoriaService.modificarCategoria(form).subscribe(() => {

       Swal.fire({
         allowOutsideClick: true,
         icon: 'info',
         text: 'Se modifico correctamente',
         title: 'Categoria'
       });
    });
  }

  selectFiltro(id: number) {
    this.filtroCategoria = id;
    console.log(this.filtroCategoria);
  }

  obtenerCategoria(cat): void{

    console.log('filtro categoria ' + cat);

    this.categoriaService.getCategoria(cat).subscribe( resp => {
      
      this.catId = resp[0].id;
      this.catNombre = resp[0].nombre;
      this.catDescripcion = resp[0].descripcion;
      this.catActivo = resp[0].activo;
      
      this.visible = true;
    });

  }
}
