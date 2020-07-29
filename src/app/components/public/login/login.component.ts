import { Component, OnInit, Output } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { Router } from '@angular/router';
import { UsuarioModel } from '../../../models/usuario.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel();

  constructor(private loginServices: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  login() {

    this.loginServices.login(this.usuario).subscribe( (resp: UsuarioModel) => {

      console.log(`resp : ${ resp }`);

      this.usuario = resp;
      console.log(`usuario: ${this.usuario}`);

      this.router.navigateByUrl('/');

    }, (err) => {

      if (err && err.error) {

        console.error(`ERROR: ${err.error.ok}`);
        console.error(`ERROR: ${err.error.err.message}`);

      } else {

        console.error(`ERROR: ${err}`);

      }

    });
  }

  signUp(){

    if (this.usuario.password.match(this.usuario.confirmPassword) === null) {
      console.log('No coinciden las contraseñas!');
      return;
    }

    this.loginServices.signUp(this.usuario).subscribe( resp => {

      console.log(`signUp resp: ${ resp }`);

      this.router.navigateByUrl('/');

    }, (err) => {

      if (err && err.error) {

        console.error(`ERROR: ${err.error.ok}`);
        console.error(`ERROR: ${err.error.err.message}`);

      } else {

        console.error(`ERROR: ${err}`);

      }

    });
  }

}
