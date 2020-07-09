import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private login: LoginService, private router: Router){

  }

  canActivate(): boolean{
    if (this.login.estaAutenticado()){
      console.log('esta autenticado');

      return true;
    } else {
      console.log('NO esta autenticado');
      this.router.navigateByUrl('login');
    }
  }

}
