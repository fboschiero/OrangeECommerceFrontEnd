import { Component, OnInit } from '@angular/core';

// Modelo
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private loginService: LoginService ) {


    this.loginService.estaAutenticado();
    
    // Borro datos temporales  
    localStorage.removeItem('orden');
    //localStorage.removeItem('carrito');

  }

  ngOnInit(): void {

  }

  



}
