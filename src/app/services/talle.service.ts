import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { TalleModel } from '../models/talle.model';

@Injectable({
  providedIn: 'root'
})
export class TalleService {

  private API_URL = environment.API_URL;

  constructor(private http: HttpClient) { }

  /*saveCategoria(body){

    return this.http.post(this.API_URL + '/insertCategoria', body);
  }*/

  getTalles(){
    return this.http.get(`${this.API_URL}/getTalles`)
      .pipe(
        map(resp => this.crearArreglo(resp))
      );
  }

  private crearArreglo(tallesObj: object){

    const talles: TalleModel[] = [];

    if (tallesObj == null){
      return [];
    }

    Object.keys(tallesObj).forEach( key => {

      if (key === 'talles'){

          for (let i = 0; i < tallesObj[key].length; i++) {
            const talle: TalleModel = new TalleModel();
            talle.descripcion = tallesObj[key][i].valor;
            talles.push(talle);
          }
      }
    });
    
    return talles;
  }

}
