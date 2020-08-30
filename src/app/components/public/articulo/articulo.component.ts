import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticuloService } from 'src/app/services/articulo.service';
import { CarritoService } from 'src/app/services/carrito.service';
import { Producto } from '../../../modelsBD/Producto';
import Swal from 'sweetalert2';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulo.component.html',
  styleUrls: ['./articulo.component.css']
})

export class ArticuloComponent implements OnInit {

  API_URL_IMAGE = environment.API_URL_IMAGE;
  
  articulo: Producto;
  articulosRelacionados: Producto[];

  @Input() colorSeleccionado: string;
  @Input() talleSeleccionado: string;
  @Input() cantidadSeleccionada: number;

  constructor(private articulosService: ArticuloService, 
              private _Activatedroute:ActivatedRoute,
              private carritoService: CarritoService ) {
      
      this.articulo = new Producto();
      const id = this._Activatedroute.snapshot.paramMap.get("id");
      this.articulosService.getArticuloById(id).subscribe( resp => {
        this.articulo = resp[0];
      });  

      this.articulosService.getArticulosRelacionados(id).subscribe( resp => {
        this.articulosRelacionados = resp;
      }); 

      console.log(this.articulo);

      this.cantidadSeleccionada = 0;     
  }

  ngOnInit(): void { }

  ngAfterViewInit() {
    window.scrollTo(0, 0);
  }

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
    if(!this.cantidadSeleccionada || this.cantidadSeleccionada == 0){
      Swal.fire({
        allowOutsideClick: true,
        icon: 'error',
        text: 'Debes ingresar la cantidad',
        title: 'Carrito'
      });
      return;
    }    
    
    this.carritoService.agregarAlCarrito(this.articulo, this.articulo.nombre, this.articulo.imagenes[0].url, 
                                         this.colorSeleccionado, this.talleSeleccionado, 
                                         this.cantidadSeleccionada, this.articulo.precioVenta)
                                         .subscribe( resp => {
      
      if(resp["ok"] == false){

        // Seteo el id de la orden de compra


        Swal.fire({
          allowOutsideClick: true,
          icon: 'error',
          text: 'El articulo no pudo ser ingresado al carrito: ' + resp["err"],
          title: 'Carrito'
        });
        return;
      
      }  else {

        /*Swal.fire({
          allowOutsideClick: true,
          icon: 'success',
          text: 'El articulo fue ingresado al carrito.',
          title: 'Carrito'
        });*/
        window.location.reload();
      } 

    });       
  }

  selectColor(color: string) {
    this.colorSeleccionado = color;
  }

  selectTalle(talle: string) {
    this.talleSeleccionado = talle;
  }

  agregarUno() {
    this.cantidadSeleccionada = this.cantidadSeleccionada + 1;
  }

  quitarUno() {
    if(this.cantidadSeleccionada > 1){
      this.cantidadSeleccionada = this.cantidadSeleccionada - 1;
    }
    
  }

}