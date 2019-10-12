import { Injectable } from '@angular/core';
import {DatePipe, formatDate} from '@angular/common';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {of, Observable, throwError} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {catchError, map, tap} from 'rxjs/operators';
import {Usuario} from './usuario';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  public urlEndPoint: string = 'http://localhost:8081/api/usuarios';
  public httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(public http: HttpClient, private router: Router) { }

  getUsuarios(page: number): Observable<any> {
    return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
      tap((response: any) => {
        (response.content as Usuario[]).forEach(cliente => {
            console.log(cliente.nombre);
        });
      }),

      map((response: any) => {

        (response.content as Usuario[]).map(user => {
          user.nombre = user.nombre.toUpperCase();
          return user;
        });
        return response;
      }),
      tap(response => {
        console.log('ClienteService: tap2');
        (response.content as Usuario[]).forEach(cliente => {
          console.log(cliente.nombre);
        });
      })
    );
  }
  create(usuario: Usuario): Observable<any> {
    return this.http.post<any>(this.urlEndPoint, usuario, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        if (e.status == 400) {
          return throwError(e);
        }
        Swal.fire( e.error.mensaje, e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }
  getUsuario(id): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.urlEndPoint}/${id}`)
      .pipe(
        catchError(e => {
          this.router.navigate(['/usuarios']);
          Swal.fire(e.error.mensaje, e.error.mensaje, 'error');
          return throwError(e);
        })
      );
  }
  update(usuario: Usuario): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}/${usuario.id}`, usuario, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        if (e.status == 400) {
          return throwError(e);
        }
        Swal.fire(e.error.mensaje, e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }
  delete(id: number): Observable<Usuario> {
    return this.http.delete<Usuario>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        Swal.fire(e.error.mensaje, e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }
}
