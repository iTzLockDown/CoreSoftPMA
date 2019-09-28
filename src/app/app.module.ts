import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { FormComponent } from './usuarios/form.component';
import {UsuariosService} from './usuarios/usuarios.service';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {LeftComponent} from './DashBoard/left.component';
import {TopComponent} from './DashBoard/top.component';
import {RouterModule, Routes} from '@angular/router';
import {MatDatepickerModule, MatNativeDateModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const routes: Routes = [

  {path: 'usuarios', component: UsuariosComponent},
  {path: 'usuarios/form', component: FormComponent },
  {path: 'usuarios/form/:id', component: FormComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    UsuariosComponent,
    FormComponent,
    LeftComponent,
    TopComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule
  ],
  providers: [
    UsuariosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
