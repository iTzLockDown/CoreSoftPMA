import { Component, OnInit } from '@angular/core';
import {Usuario} from './usuario';
import {UsuariosService} from './usuarios.service';
import Swal from 'sweetalert2';
import {tap} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html'
})
export class UsuariosComponent implements OnInit {
  usuario: Usuario[];
  paginador: any;
  constructor(public usuariosService: UsuariosService, private activateRoute: ActivatedRoute) { }

  ngOnInit() {

    this.activateRoute.paramMap.subscribe( params => {
      let page: number = +params.get('page');
      if (!page) {
        page = 0;
      }
      this.usuariosService.getUsuarios(page).pipe(
        tap(response => {
          console.log('ClienteComponente: tap3 ');
          (response.content as Usuario[]).forEach(usuario => {
            console.log(usuario.nombre);
          });
        })
      )
        .subscribe(
          response => {

            this.usuario = response.content as Usuario[];
            this.paginador = response;
          });
    });
  }
  delete(usuario: Usuario): void {
    Swal.fire({
      title: '¿Estas seguro?',
      text: `¿Estas seguro de eliminar?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar usuario.!'
    }).then((result) => {
      if (result.value) {
        this.usuariosService.delete(usuario.id).subscribe(
          response => {
            this.usuario = this.usuario.filter(user => user !== usuario)
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            );
          });
      }
    });
  }
}
