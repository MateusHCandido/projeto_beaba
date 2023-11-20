import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TemplateModule } from './template/template.module';
import { UsuarioModule } from './usuario/usuario.module';
import { CompartilharDadosService } from './services/compartilhar-dados.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';




@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    UsuarioModule,
    TemplateModule,
    CommonModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatProgressBarModule
  
  ],
  providers: [CompartilharDadosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
