import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { CodigueraColor } from '../modelsBD/CodigueraColor';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  private API_URL = environment.API_URL;

  constructor(private http: HttpClient) { }

  getColores(){
    return this.http.get(`${this.API_URL}/getColores`)
      .pipe(
        map(resp => this.crearArreglo(resp))
      );
  }

  private crearArreglo(coloresObj: object){

    const colores: CodigueraColor[] = [];

    if (coloresObj == null){
      return [];
    }

    Object.keys(coloresObj).forEach( key => {
      //console.log(coloresObj[key]);
      if (key === 'colores'){
        
          for (let i = 0; i < coloresObj[key].length; i++) {
            const color: CodigueraColor = new CodigueraColor();
            color.valor = coloresObj[key][i].valor;
            colores.push(color);
          }
      }
    });
    
    return colores;
  }

}
