import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroTemplateComponent } from './components/registro-template/registro-template.component';
import { TemplateComponent } from './template.component';
import { TemplateRourtingModule } from './template-routing.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AlterarPerfilComponent } from './components/alterar-perfil/alterar-perfil.component';
import { FormsModule } from '@angular/forms';
import { DialogoConfirmacaoModule } from './components/alterar-perfil/dialogo-confirmacao/dialogo-confirmacao.module';
import { TemplatesCadastradosComponent } from './components/templates-cadastrados/templates-cadastrados.component';
import { InformacoesTemplateComponent } from './components/informacoes-template/informacoes-template.component';
import { ArquivosCadastradosComponent } from './components/arquivos-cadastrados/arquivos-cadastrados.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';



@NgModule({
  declarations: [
    TemplateComponent,
    RegistroTemplateComponent,
    SidebarComponent,
    AlterarPerfilComponent,
    TemplatesCadastradosComponent,
    InformacoesTemplateComponent,
    ArquivosCadastradosComponent,
    DashboardComponent,

  ],
  imports: [
    CommonModule,
    TemplateRourtingModule,
    FormsModule,
    DialogoConfirmacaoModule,
    MatPaginatorModule,
    MatProgressBarModule
  ],
  exports: [
    TemplateComponent
  ]
})
export class TemplateModule { }
