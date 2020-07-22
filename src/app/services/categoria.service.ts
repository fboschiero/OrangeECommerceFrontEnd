import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { CategoriaModel } from '../models/categoria.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private API_URL = environment.API_URL;

  constructor(private http: HttpClient) { }

  saveCategoria(body){

    return this.http.post('http://localhost:3006/insertCategoria', body);
  }

  getCategorias(){
    return this.http.get(`${this.API_URL}/getCategoria`)
      .pipe(
        map(resp => this.crearArreglo(resp))
      );
  }

  private crearArreglo(categoriasObj: object){

    const categorias: CategoriaModel[] = [];

    if (categoriasObj == null){
      return [];
    }

    Object.keys(categoriasObj).forEach( key => {

      if (key === 'categoria'){

          const largo =  categoriasObj[key].length;

          for (let i = 0; i < largo; i++) {
            // console.log(articulosObj[key][i]._id);
            const categoria: CategoriaModel = new CategoriaModel(); // articulosObj[key];
            categoria.id = categoriasObj[key][i]._id;
            categoria.nombre = categoriasObj[key][i].nombre;
            categorias.push(categoria);
          }
      }
    });
    console.log(categorias);
    return categorias;
  }

}
