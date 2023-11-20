
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegistroTemplateComponent } from './components/registro-template/registro-template.component';
import { AlterarPerfilComponent } from './components/alterar-perfil/alterar-perfil.component';
import { TemplatesCadastradosComponent } from './components/templates-cadastrados/templates-cadastrados.component';
import { InformacoesTemplateComponent } from './components/informacoes-template/informacoes-template.component';
import { ArquivosCadastradosComponent } from './components/arquivos-cadastrados/arquivos-cadastrados.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
    {path: 'template/registrar-template', component: RegistroTemplateComponent},
    {path: 'usuario/alterar-perfil', component: AlterarPerfilComponent},
    {path: 'template/templates-cadastrados', component: TemplatesCadastradosComponent},
    {path: 'template/informacoes-template/:id_template', component: InformacoesTemplateComponent},
    {path: 'template/validacao-upload-arquivos', component: ArquivosCadastradosComponent},
    {path: 'arquivos/dashboard/info', component: DashboardComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })

  export class TemplateRourtingModule {}