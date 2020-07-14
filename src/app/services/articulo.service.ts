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
    return this.http.get(`${this.API_URL}/getArticulos?cantidad=` + cantidad + `;desde=` + desde)
      .pipe(
        map(resp => this.crearArreglo(resp))
      );
  }

  private crearArreglo(articulosObj: object){

    const articulos: ArticuloModel[] = [];

    console.log(articulosObj);

    if (articulosObj == null){
      return [];
    }

    Object.keys(articulosObj).forEach( key => {
      const articulo: ArticuloModel = articulosObj[key];
      // articulo.id = key;
      articulos.push(articulo);
    });

    return articulos;
  }
}
