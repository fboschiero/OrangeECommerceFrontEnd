import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { ArticuloModel } from '../models/articulo.model';
import { ImagenModel } from '../models/imagen.model';
import { ColorModel } from '../models/color.model';
import { StockModel } from '../models/stock.model';

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

  getArticulosEnOferta(desde: number, cantidad: number){
    // return this.http.get(`${this.API_URL}/getArticulos?cantidad=` + cantidad + `;desde=` + desde)
    return this.http.get(`${this.API_URL}/getArticulosEnOferta?cantidad=` + cantidad + `;desde=` + desde)
      .pipe(
        map(resp => this.crearArreglo(resp))
      );
  }

  getArticulosPorFiltros(filtroCategoria: number, filtroPrecio: number, filtroTalle: string, cantidad: number, desde: number){
    return this.http.get(`${this.API_URL}/getArticulosPorFiltros/` + filtroCategoria + `/` + filtroPrecio + `/` + filtroTalle + `/` + cantidad + `/` + desde)
      .pipe(
        map(resp => this.crearArreglo(resp))
      );
  }

  getArticuloById(param: string){
    return this.http.get(`${this.API_URL}/getArticuloById/` + param)
      .pipe(
        map(resp => this.crearArreglo(resp))
      );
  }

  getArticulosRelacionados(param: string){
    return this.http.get(`${this.API_URL}/getArticulosRelacionados/` + param)
      .pipe(
        map(resp => this.crearArreglo(resp))
      );
  }

  guardarArticulo(body){
    return this.http.post(this.API_URL + '/insertArticulo', body);
  }

  private crearArreglo(articulosObj: object){

    const articulos: ArticuloModel[] = [];

    if (articulosObj == null){
      return [];
    }

    Object.keys(articulosObj).forEach( key => {

      if (key === 'articulos'){

          const largo =  articulosObj[key].length;

          for (let i = 0; i < largo; i++) {
            // console.log(articulosObj[key][i]._id);
            const articulo: ArticuloModel = new ArticuloModel(); // articulosObj[key];
            articulo.id = articulosObj[key][i].id;
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

            // Stock
            articulo.stocks = []; 
            for (let k = 0; k < articulosObj[key][i].stocks.length; k++) {
              
              const stock: StockModel = new StockModel();
              stock.id = articulosObj[key][i].stocks[k].id;
              stock.codiguera_color_id = articulosObj[key][i].stocks[k].codiguera_color_id;
              stock.codiguera_color_valor = articulosObj[key][i].stocks[k].codiguera_color_valor;
              stock.codiguera_talle_id = articulosObj[key][i].stocks[k].codiguera_talle_id;
              stock.codiguera_talle_valor = articulosObj[key][i].stocks[k].codiguera_talle_valor;
              stock.cantidad = articulosObj[key][i].stocks[k].cantidad;

              articulo.stocks[k] = stock;
            }

            articulos.push(articulo);
          }


      }

    });
    console.log(articulos);
    return articulos;
  }
}
