import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompartilharDadosService } from 'src/app/services/compartilhar-dados.service';
import { Usuario } from 'src/app/usuario/usuario';
import { TemplateRequest, StatusTemplate } from '../../template';
import { TemplateService } from 'src/app/services/template.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { CampoTemplate, CampoTemplateRequest } from '../../campo-template';

@Component({
  selector: 'app-informacoes-template',
  templateUrl: './informacoes-template.component.html',
  styleUrls: ['./informacoes-template.component.css']
})
export class InformacoesTemplateComponent implements OnInit {

  idTemplate: any;
  matriculaUsuario?: any;

  statusTemplate!: string;

  usuario = new Usuario(this.dadosUsuarioLogado.getDados());
  template!: TemplateRequest;
  criadorTemplate!: Usuario;
  listaCamposTemplate : CampoTemplate[] = [];
  alteracoesRealizadas = false;

  constructor(private router: ActivatedRoute, private dadosUsuarioLogado: CompartilharDadosService, private templateService: TemplateService,
    private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.router.paramMap.subscribe( parametros => { this.idTemplate = parametros.get('id_template'); } )

    this.templateService.buscarTemplatePorId(parseInt(this.idTemplate)).subscribe(
      (templateResponse => {
        console.log(templateResponse[0]);
        this.template = new TemplateRequest(templateResponse[0]);
        this.matriculaUsuario = this.template.criador_template;
        
        for (let campo_template of templateResponse[0].campos_template){
            let campo = new CampoTemplateRequest(campo_template);
            this.listaCamposTemplate.push( campo );
        }
        
        this.usuarioService.buscarDadosUsuario(this.matriculaUsuario).subscribe(
          (usuario_response =>{
            this.criadorTemplate = new Usuario(usuario_response);
          })
        );


      })
    )
  }

  alterarPerfil(statusTemplate: string){
    this.statusTemplate = statusTemplate;
    console.log(this.statusTemplate);
  }

  salvarAlteracoes(){
    console.log(this.template.status_template);
    console.log(this.statusTemplate);
    console.log(this.statusTemplate != this.template.status_template)
    if (this.template.status_template != this.statusTemplate){
      let id_template: any = this.template.id_template;
      this.templateService.alterarStatusTemplate(id_template).subscribe();
      this.alteracoesRealizadas = true;
    }
  }

}
