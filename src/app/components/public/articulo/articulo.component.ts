import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticuloService } from 'src/app/services/articulo.service';
import { ArticuloModel } from '../../../models/articulo.model';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulo.component.html',
  styleUrls: ['./articulo.component.css']
})

export class ArticuloComponent implements OnInit {

  articulo: ArticuloModel;

  constructor(private articulosService: ArticuloService, 
              private _Activatedroute:ActivatedRoute ) {
      this.articulo = new ArticuloModel();

      const id = this._Activatedroute.snapshot.paramMap.get("id");
      this.articulosService.getArticuloById(id).subscribe( resp => {
        this.articulo = resp[0];
        //console.log(this.articulo);
       }); 
      
  }

  ngOnInit(): void {
    
    
  }

}
