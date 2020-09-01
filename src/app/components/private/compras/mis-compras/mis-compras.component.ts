import { Component, OnInit } from '@angular/core';
import { ComprasService } from 'src/app/services/compras.service';
import { OrdenCompra } from 'src/app/modelsBD/OrdenCompra';
import { NgxPaginationModule } from 'ngx-pagination';
import { LoginService } from 'src/app/services/login.service';
import { Usuario } from 'src/app/modelsBD/Usuario';

@Component({
  selector: 'app-mis-compras',
  templateUrl: './mis-compras.component.html',
  styleUrls: ['./mis-compras.component.css']
})
export class MisComprasComponent implements OnInit {

  listaCompras: OrdenCompra[] = [];
  p: number = 1;
  usuario: Usuario;

  constructor(private comprasService: ComprasService,
              private loginService: LoginService) {

    const usr = localStorage.getItem('usuario');
    this.usuario = JSON.parse(usr);
    
    // agrego fecha desde y hasta para luego filtrar en un futuro
    this.listaCompras = this.comprasService.obtenerCompras(this.usuario.email, new Date(), new Date());
      
  }

  ngOnInit(): void {
  }

  next() {
    console.log('siguienteeee');
    
  }

}
