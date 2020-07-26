import { Component, OnInit, Input } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { ArticuloService } from 'src/app/services/articulo.service';
import { ArticuloModel } from '../../../models/articulo.model';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulo.component.html',
  styleUrls: ['./articulo.component.css']
})
export class ArticuloComponent implements OnInit {

  articulo: ArticuloModel;

  constructor(private _Activatedroute:ActivatedRoute,
              private articulosService: ArticuloService  ) {
    
  }

  ngOnInit(): void {
    const id=this._Activatedroute.snapshot.paramMap.get("id");
    const articulos = this.articulosService.getArticuloById(id);
    console.log(articulos);
  }

  

}
