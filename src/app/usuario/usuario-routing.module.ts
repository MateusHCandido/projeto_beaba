import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { RegistroTemplateComponent } from '../template/components/registro-template/registro-template.component';
import { DashboardComponent } from '../template/components/dashboard/dashboard.component';

const routes: Routes = [

    {path: 'login', component: LoginComponent},
    {path: 'cadastro-usuario', component: CadastroComponent},
    {path: 'template/registrar-template', component: RegistroTemplateComponent},
    {path: 'arquivos/dashboard/info', component: DashboardComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })

  export class UsuarioRourtingModule {}