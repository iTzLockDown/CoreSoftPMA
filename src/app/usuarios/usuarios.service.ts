import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Usuario} from './usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  public urlEndPoint: string = 'http://localhost:8081/api/usuarios';
  public httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(public http: HttpClient) { }

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map(response => response as Usuario[])
    );
  }
  create(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.urlEndPoint, usuario, {headers: this.httpHeaders});
  }
  getUsuario(id): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.urlEndPoint}/${id}`);
  }
  update(usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.urlEndPoint}/${usuario.id}`, usuario, {headers: this.httpHeaders});
  }
  delete(id: number): Observable<Usuario> {
    return this.http.delete<Usuario>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders});
  }
}
