import { Component, OnInit, Output } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Usuario } from '../../../modelsBD/Usuario';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: Usuario = new Usuario();

  constructor(private loginServices: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  login() {

    this.loginServices.login(this.usuario).subscribe( (resp: any) => {

      console.log(`resp : ${ resp }`);

      this.usuario = resp;
      console.log(`usuario: ${this.usuario}`);

      this.router.navigateByUrl('/');

    }, (err) => {

      let msg = '';
      if (!err.ok) {
        msg = err.error['err'].message;
      }

      Swal.fire({
        allowOutsideClick: true,
        icon: 'error',
        text: `${msg}`,
        title: 'Usuario'
      });
      return;

    });
  }

  signUp(){

    if (this.usuario.password.match(this.usuario.confirmPassword) === null) {
      Swal.fire({
        allowOutsideClick: true,
        icon: 'error',
        text: `No coinciden las contraseñas`,
        title: 'Usuario'
      });
      return;
    }

    this.loginServices.signUp(this.usuario).subscribe( resp => {

      console.log(`signUp`);

      this.router.navigateByUrl('/');

    }, (err) => {

      console.log('Error:');
      
      console.log(err);
      

      let msg = '';
      if (!err.ok) {
        msg = err.error['err'].message;
      }

      Swal.fire({
        allowOutsideClick: true,
        icon: 'error',
        text: `${msg}`,
        title: 'Usuario'
      });
      return;

    });
  }

}
