import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { CodigueraTalle } from '../modelsBD/CodigueraTalle';

@Injectable({
  providedIn: 'root'
})
export class TalleService {

  private API_URL = environment.API_URL;

  constructor(private http: HttpClient) { }

  getTalles(){
    return this.http.get(`${this.API_URL}/getTalles`)
      .pipe(
        map(resp => this.crearArreglo(resp))
      );
  }

  private crearArreglo(tallesObj: object){

    const talles: CodigueraTalle[] = [];

    if (tallesObj == null){
      return [];
    }

    Object.keys(tallesObj).forEach( key => {

      if (key === 'talles'){

          for (let i = 0; i < tallesObj[key].length; i++) {
            const talle: CodigueraTalle = new CodigueraTalle();
            talle.valor = tallesObj[key][i].valor;
            talles.push(talle);
          }
      }
    });
    
    return talles;
  }

}
