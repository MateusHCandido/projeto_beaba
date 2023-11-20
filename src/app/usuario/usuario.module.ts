import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { UsuarioRourtingModule } from './usuario-routing.module';
import { FormsModule } from '@angular/forms';

import { TemplateModule } from '../template/template.module';
import { CompartilharDadosService } from '../services/compartilhar-dados.service';




@NgModule({
  declarations: [
    LoginComponent,
    CadastroComponent,
    
  ],
  imports: [
    CommonModule,
    UsuarioRourtingModule,
    FormsModule,
    TemplateModule,
  ],
  exports: [
    LoginComponent,
    CadastroComponent,
    
  ]
})
export class UsuarioModule { }
