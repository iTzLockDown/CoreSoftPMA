import { Component, OnInit } from '@angular/core';
import {Usuario} from './usuario';
import {UsuariosService} from './usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html'
})
export class UsuariosComponent implements OnInit {
  usuario: Usuario[];
  constructor(public usuariosService: UsuariosService) { }

  ngOnInit() {
    this.usuariosService.getUsuarios().subscribe(
      usuario => this.usuario = usuario
    );
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
