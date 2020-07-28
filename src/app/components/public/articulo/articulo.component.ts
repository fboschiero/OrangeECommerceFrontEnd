import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticuloService } from 'src/app/services/articulo.service';
import { CarritoService } from 'src/app/services/carrito.service';
import { ArticuloModel } from '../../../models/articulo.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulo.component.html',
  styleUrls: ['./articulo.component.css']
})

export class ArticuloComponent implements OnInit {

  articulo: ArticuloModel;

  @Input() colorSeleccionado: number;
  @Input() talleSeleccionado: number;
  @Input() cantidadSeleccionada: number;

  constructor(private articulosService: ArticuloService, 
              private _Activatedroute:ActivatedRoute,
              private carritoService: CarritoService ) {
      
      this.articulo = new ArticuloModel();
      const id = this._Activatedroute.snapshot.paramMap.get("id");
      this.articulosService.getArticuloById(id).subscribe( resp => {
        this.articulo = resp[0];
      });       
  }

  ngOnInit(): void { }

  agregarAlCarrito(){
    
    if(!this.colorSeleccionado){
      Swal.fire({
        allowOutsideClick: true,
        icon: 'error',
        text: 'Debes ingresar el color',
        title: 'Carrito'
      });
      return;
    }    
    if(!this.talleSeleccionado){
      Swal.fire({
        allowOutsideClick: true,
        icon: 'error',
        text: 'Debes ingresar el talle',
        title: 'Carrito'
      });
      return;
    }
    if(!this.cantidadSeleccionada){
      Swal.fire({
        allowOutsideClick: true,
        icon: 'error',
        text: 'Debes ingresar la cantidad',
        title: 'Carrito'
      });
      return;
    }    
    
    //this.carritoService.agregarAlCarrito(this.articulo.id, this.colorSeleccionado, this.talleSeleccionado, this.cantidadSeleccionada, this.articulo.precio);
  }

  selectColor(id: number) {
    this.colorSeleccionado = id;
  }

  selectTalle(id: number) {
    this.talleSeleccionado = id;
  }

  selectCantidad(cant: number) {
    this.cantidadSeleccionada = cant;
  }

}