import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { ArticuloModel } from '../models/articulo.model';

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {

  private API_URL = environment.API_URL;

  constructor(private http: HttpClient) {}

  getArticulos(desde: number, cantidad: number){
    // return this.http.get(`${this.API_URL}/getArticulos?cantidad=` + cantidad + `;desde=` + desde)
    return this.http.get(`${this.API_URL}/getArticles`)
      .pipe(
        map(resp => this.crearArreglo(resp))
      );
  }

  getArticulosDestacados(desde: number, cantidad: number){
    // return this.http.get(`${this.API_URL}/getArticulos?cantidad=` + cantidad + `;desde=` + desde)
    return this.http.get(`${this.API_URL}/getHighLigthArticles?cantidad=` + cantidad + `;desde=` + desde)
      .pipe(
        map(resp => this.crearArreglo(resp))
      );
  }

  private crearArreglo(articulosObj: object){

    const articulos: ArticuloModel[] = [];

    // console.log(articulosObj);

    if (articulosObj == null){
      return [];
    }

    Object.keys(articulosObj).forEach( key => {

      if (key === 'articulos'){

          const largo =  articulosObj[key].length;

          for (let i = 0; i < largo; i++) {
            // console.log(articulosObj[key][i]._id);
            const articulo: ArticuloModel = new ArticuloModel(); // articulosObj[key];
            articulo.id = articulosObj[key][i]._id;
            articulo.nombre = articulosObj[key][i].nombre;
            articulo.precio = articulosObj[key][i].precio;
            articulo.img = articulosObj[key][i].img;
            articulo.imgDimensiones = articulosObj[key][i].imgDimensiones;
            // articulo.categorias = articulosObj[key][i].nomcategoriasbre;
            // articulo.talles = articulosObj[key][i].talles;
            articulo.stock = articulosObj[key][i].stock;
            articulo.vendidos = articulosObj[key][i].vendidos;
            articulo.oferta = articulosObj[key][i].oferta;
            articulo.peso = articulosObj[key][i].peso;
            articulo.unidadDePeso = articulosObj[key][i].unidadDePeso;
            articulo.activo = articulosObj[key][i].activo;
            articulo.articuloNuevo = articulosObj[key][i].articuloNuevo;
            articulo.descuento = articulosObj[key][i].descuento;
            articulo.coloresDisponibles = articulosObj[key][i].coloresDisponibles;
            articulo.destacado = articulosObj[key][i].destacado;
            // articulo.id = key;
            articulos.push(articulo);
          }


      }

    });
    console.log(articulos);
    return articulos;
  }
}
