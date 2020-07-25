import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { ArticuloModel } from '../models/articulo.model';
import { ImagenModel } from '../models/imagen.model';

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
    return this.http.get(`${this.API_URL}/getArticulosDestacados?cantidad=` + cantidad + `;desde=` + desde)
      .pipe(
        map(resp => this.crearArreglo(resp))
      );
  }

  getArticulosPorFiltros(filtroCategoria: string, filtroPrecio: number, cantidad: number, desde: number){
    // return this.http.get(`${this.API_URL}/getArticulos?cantidad=` + cantidad + `;desde=` + desde)
    return this.http.get(`${this.API_URL}/getArticulosPorFiltros/` + filtroCategoria + `/` + filtroPrecio + `/` + cantidad + `/` + desde)
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
            articulo.peso = articulosObj[key][i].peso;
            articulo.activo = articulosObj[key][i].activo;
            articulo.descuento = articulosObj[key][i].descuento;
            articulo.destacado = articulosObj[key][i].destacado;

            // Imagenes
            articulo.imagenes = []; 
            for (let j = 0; j < articulosObj[key][i].imagenes.length; j++) {
              const imagen: ImagenModel = new ImagenModel();
              imagen.id = articulosObj[key][i].imagenes[j].id;
              imagen.url = articulosObj[key][i].imagenes[j].url;

              articulo.imagenes[j] = imagen;
            }

            articulos.push(articulo);
          }


      }

    });
    console.log(articulos);
    return articulos;
  }
}
