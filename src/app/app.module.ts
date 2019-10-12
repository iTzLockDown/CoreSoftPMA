import { BrowserModule } from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import localeES from '@angular/common/locales/es-PE';
registerLocaleData(localeES, 'es');
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
import {registerLocaleData} from '@angular/common';
import { PaginatorComponent } from './paginator/paginator.component';
import { EstacionesComponent } from './estaciones/estaciones.component';

const routes: Routes = [

  {path: 'usuarios', component: UsuariosComponent},
  {path: 'usuarios/page/:page', component: UsuariosComponent},
  {path: 'usuarios/form', component: FormComponent },
  {path: 'usuarios/form/:id', component: FormComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    UsuariosComponent,
    FormComponent,
    LeftComponent,
    TopComponent,
    PaginatorComponent,
    EstacionesComponent
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
    UsuariosService,
    {provide: LOCALE_ID, useValue: 'es-PE'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
