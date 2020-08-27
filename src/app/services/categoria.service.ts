import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Categoria } from '../modelsBD/Categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private API_URL = environment.API_URL;

  constructor(private http: HttpClient) { }

  saveCategoria(body){

    return this.http.post(this.API_URL + '/insertCategoria/', body);
  }

  modificarCategoria(body){

    return this.http.post(this.API_URL + '/modificarCategoria/', body);
  }

  getCategorias(){

    return this.http.get(this.API_URL + '/getCategorias/')
      .pipe(
        map(resp => this.crearArreglo(resp))
      );

  }

  getCategoria(param){
    return this.http.get(`${this.API_URL}/getCategoria/` + param)
      .pipe(
        map(resp => this.crearArregloById(resp))
      );
  }

  private crearArreglo(categoriasObj: object){

    const categorias: Categoria[] = [];

    if (categoriasObj == null){
      return [];
    }

    Object.keys(categoriasObj).forEach( key => {

      if (key === 'categorias'){

          const largo =  categoriasObj[key].length;

          for (let i = 0; i < largo; i++) {
            // console.log(articulosObj[key][i]._id);
            const categoria: Categoria = new Categoria(); // articulosObj[key];

            //console.log('ID en arreglo ' + categoriasObj[key][i].id);

            categoria.id = categoriasObj[key][i].id;
            categoria.nombre = categoriasObj[key][i].nombre;
            categorias.push(categoria);
          }
      }
    });
    console.log('CATEGORIAS en arreglo' + categorias);
    return categorias;
  }

  private crearArregloById(categoriasObj: object){

    const categorias: Categoria[] = [];

    if (categoriasObj == null){
      return [];
    }

    Object.keys(categoriasObj).forEach( key => {

      if (key === 'categoria'){
        const categoria: Categoria = new Categoria(); // articulosObj[key];

        categoria.id = categoriasObj[key][0].id;
        categoria.nombre = categoriasObj[key][0].nombre;
        categoria.descripcion = categoriasObj[key][0].descripcion;
        categoria.activo = categoriasObj[key][0].activo;
        categoria.imagen = categoriasObj[key][0].img;
        categorias.push(categoria);
        console.log(categoria.nombre);
      }
    });
    
    return categorias;
  }

}
