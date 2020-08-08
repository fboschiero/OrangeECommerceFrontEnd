import { Component, OnInit } from '@angular/core';

// Servicios
import { ArticuloService } from '../../../services/articulo.service';
import { CategoriaService } from '../../../services/categoria.service';
import { TalleService } from '../../../services/talle.service';
// Modelo
import { ArticuloModel } from '../../../models/articulo.model';
import { CategoriaModel } from '../../../models/categoria.model';
import { TalleModel } from '../../../models/talle.model';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private DESDE = 0;
  private CANTIDAD = 10;

  articulos: ArticuloModel[] = [];
  articulosEnOferta: ArticuloModel[] = [];
  categorias: CategoriaModel[] = [];
  talles: TalleModel[] = [];

  constructor(private articuloService: ArticuloService,
              private categoriaService: CategoriaService,
              private talleService: TalleService,
              private loginService: LoginService ) {

    // Cargo los articulos destacados 
    this.articuloService.getArticulosDestacados(1, 1).subscribe( resp => {
      this.articulos = resp;
    });

    // Cargo los articulos en Oferta 
    this.articuloService.getArticulosEnOferta(1, 1).subscribe( resp => {
      this.articulosEnOferta = resp;
    });

    // Cargo las categorias para el panel de filtros
    this.categoriaService.getCategorias().subscribe( resp => {
      this.categorias = resp;
    });

    // Cargo los talles para el panel de filtros
    this.talleService.getTalles().subscribe( resp => {
      this.talles = resp;
    });
    
    this.loginService.estaAutenticado();
    
    // Borro datos temporales  
    localStorage.removeItem('orden');
    //localStorage.removeItem('carrito');

  }

  ngOnInit(): void {

  }

  



}
