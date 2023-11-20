import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TemplateService } from 'src/app/services/template.service';
import { TemplateRequest } from '../../template';
import { MatPaginator, PageEvent } from '@angular/material/paginator';



@Component({
  selector: 'app-templates-cadastrados',
  templateUrl: './templates-cadastrados.component.html',
  styleUrls: ['./templates-cadastrados.component.css']
})
export class TemplatesCadastradosComponent implements OnInit {

  tituloBusca: string = '';
  categoriaBusca: string = '';

  listaTemplatesExibindo = true;
  resultadoBusca = false;
  templateNaoLocalizado = false;
  semRegistroTemplates = false;


  listaTemplates: TemplateRequest[] = [];
  pageSlice!: any;
  
  template!: TemplateRequest;


  constructor(private templateService: TemplateService, private router: Router) {}



  ngOnInit(): void {
    
    this.templateService.listarTodosTemplates()
    .subscribe( ( response ) =>{
      for ( let template of response){
        this.listaTemplates.push( template );
      }
      this.pageSlice = this.listaTemplates.slice( 0, 5);
    });
  
  }

  filtrarBusca(){
    this.semRegistroTemplates = false;

    let camposPreenchidos = this.categoriaBusca != '' && this.categoriaBusca != '';
    this.listaTemplates = []

    if ( camposPreenchidos ){
      switch ( this.categoriaBusca ){
        case 'id':
          this.templateService.buscarTemplatePorId(parseInt(this.tituloBusca))
          .subscribe(
            (template => {
              for (let template_reponse of template){
                this.template = new TemplateRequest(template_reponse);
                this.listaTemplates.push( this.template );
                this.templateNaoLocalizado = false;
                this.listaTemplatesExibindo = false;
                this.semRegistroTemplates = false;
                this.resultadoBusca = true;
              }
            }),
            (templateError) => {
              this.templateNaoLocalizado = true;
            }
          );
          break;

        case 'nome':
          console.log(this.tituloBusca);
          this.templateService.buscarTemplatePorNome(this.tituloBusca)
          .subscribe(
            (template => {
              for (let template_reponse of template){
                this.template = new TemplateRequest(template_reponse);
                this.listaTemplates.push( this.template );
                this.templateNaoLocalizado = false;
                this.semRegistroTemplates = false;
              }
            }),
            (templateError) => {
              this.templateNaoLocalizado = true;
            }
          )
          break;

        case 'matrícula':
          this.templateService.buscarTemplatePorMatriculaCriador(this.tituloBusca)
          .subscribe(
            (template => {
              for (let template_reponse of template){
                this.template = new TemplateRequest(template_reponse);
                this.listaTemplates.push( this.template );
                this.templateNaoLocalizado = false;
                this.semRegistroTemplates = false;
              }
            }),
            (templateError) => {
              this.templateNaoLocalizado = true;
            }
          )
          break;

        case 'status':
          this.templateService.buscarMatriculaPorStatus(this.tituloBusca)
          .subscribe(
            (template => {
              for (let template_reponse of template){
                this.template = new TemplateRequest(template_reponse);
                this.listaTemplates.push( this.template );
                this.templateNaoLocalizado = false;
                this.semRegistroTemplates = false;
              }
            }),
            (templateError) => {
              this.templateNaoLocalizado = true;
            }
          );
          break;
      }
    }else{
      this.listaTemplatesExibindo = false;
      this.semRegistroTemplates = true;
      console.log('to sendo chamado')
      this.resultadoBusca = true;
    }


  }

  OnPageChange(event: PageEvent){
    
    
    const indiceInicial = event.pageIndex * event.pageSize;
    let indiceFinal = indiceInicial + event.pageSize;

    if ( indiceInicial > this.listaTemplates.length ){
      indiceFinal = this.listaTemplates.length;
    }

    this.pageSlice = this.listaTemplates.slice( indiceInicial, indiceFinal );
  }


  informacoesTemplate(idTemplate: any){
    this.router.navigate(['/template/informacoes-template', idTemplate]);
  }

  downloadTemplate(idTemplate: any){
    this.templateService.downloadTemplateArquivo(idTemplate).subscribe(
      (response) => {
       response == true? console.log('tudo ok') : console.log('deu ruim');
      }
     )
  }
}
