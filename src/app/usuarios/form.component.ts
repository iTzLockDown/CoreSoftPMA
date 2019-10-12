import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Usuario} from './usuario';
import {UsuariosService} from './usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-udelform',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {
  public usuarios: Usuario = new Usuario();
  public titulo = 'Formulario de Usuarios';
  public errores: string[];
  constructor(public usuarioService: UsuariosService,
              public router: Router,
              public activatedRoute: ActivatedRoute) { }
  ngOnInit() {
    this.cargarUsuario();
  }
  cargarUsuario(): void {
    this.activatedRoute.params.subscribe(
      params => {
        let id = params['id']
        if (id) {
          this.usuarioService.getUsuario(id).subscribe(
            (usuarios) => this.usuarios = usuarios);
        }
      });
  }

  create(): void {
    this.usuarioService.create(this.usuarios)
      .subscribe(
        json => {
          this.router.navigate(['/usuarios'])
          Swal.fire('Nuevo usuario ', `${json.mensaje}: ${json.usuario.nombre}`, 'success'); },
        err => {
          this.errores = err.error.errors as string[];
        }
      );
  }
  update(): void {
    this.usuarioService.update(this.usuarios).subscribe(
      json => {
        this.router.navigate(['/usuarios'])
        Swal.fire('Usuario Actualizado', `${json.mensaje}: ${json.usuario.nombre}`, 'success');
      },
      err => {
        this.errores = err.error.errors as string[];
      }
    );
  }

}
