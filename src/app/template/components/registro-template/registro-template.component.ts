import { Component } from '@angular/core';
import { CompartilharDadosService } from 'src/app/services/compartilhar-dados.service';
import { Template } from '../../template';
import { CampoTemplate, TipoDado } from '../../campo-template';
import { TemplateService } from 'src/app/services/template.service';

@Component({
  selector: 'app-registro-template',
  templateUrl: './registro-template.component.html',
  styleUrls: ['./registro-template.component.css']
})
export class RegistroTemplateComponent  {
  usuario: any;
  
  nomeTemplate: string = '';
  extensaoTemplate: string = '';
  quantidadeCampos!: number;
  tipoDado: string[] = ['TEXTO', 'NÚMERO INTEIRO', 'NÚMERO DECIMAL', 'DATA'];
  

  camposArray: any[] = [];
  camposTemplate: CampoTemplate[] = [];

  templateCadastrado: boolean = false;
  templateNaoCadastrado: boolean = false;
  nomeTemplateNaoPadrao: boolean = false;

  constructor(private templateService: TemplateService ,private dadosCompartilhados: CompartilharDadosService) {
    this.usuario = this.dadosCompartilhados.getDados(); 
  }


  registrarTemplate(){
    //recebe os campos do template
    for (let campo of this.camposArray) {
      this.camposTemplate.push(new CampoTemplate(campo.nomeCampo, this.definirTipoDado( campo.tipoDado )));
    }

    if ( this.validarCampoTemplate( this.camposTemplate ) ){
      // instancia de template recebe dados
      let template = new Template();

      template.nome_template = this.nomeTemplate;
      template.extensao_arquivo = this.extensaoTemplate;
      template.quantidade_campos = this.quantidadeCampos;
      template.criador_template = this.usuario.matricula;
      template.id_campo_template = this.camposTemplate;

      // confirma preenchimento dos campos
      if ( this.validarInfoTemplate( this.nomeTemplate.trim(), this.extensaoTemplate, this.quantidadeCampos ) ){
        let nomeTemplateValido = this.validarNomeTemplate( this.nomeTemplate );

        if ( nomeTemplateValido ){
          //conclusão cadastro
          this.templateService.registrarTemplate(template).subscribe(
            (response => {
              response == true? this.templateCadastrado = true : this.templateNaoCadastrado = true;
              if ( this.templateCadastrado == true ){
                this.templateNaoCadastrado = false;
              }

              this.camposTemplate.splice;
              this.camposArray.splice;
            }),
            (erro => {
              if ( erro.status == 404 || erro.status == 400 ){
                this.templateNaoCadastrado = true;
                this.nomeTemplateNaoPadrao = false
      
                this.camposTemplate.splice( 0, this.camposTemplate.length );
              }
            })
          );
        }else{
          console.log('o erro chegou')
          this.nomeTemplateNaoPadrao = true;
          this.templateNaoCadastrado = false;
        }
      }
        
    }
  }

  validarCampoTemplate(camposTemplate: CampoTemplate[]) : Boolean{
    if ( camposTemplate.length <= 0 ){
      this.templateNaoCadastrado = true;
      return false;
    }
    return true;
  }

  validarInfoTemplate(nomeTemplate: string, extensaoArquivo: string, quantidadeCampos: number){

    let quantidadeCamposValida = quantidadeCampos > 0 ? true : false;
    let nomeTemplateValido = nomeTemplate != '' ? true : false;
    let extensaArquivoValida = extensaoArquivo != '' ? true : false;

    return quantidadeCamposValida && nomeTemplateValido && extensaArquivoValida ? true : false;
  }

  validarNomeTemplate(nomeTemplate: string){
    const regex = /^[a-zA-Z0-9áéíóúÁÉÍÓÚãõÃÕâêîôûÂÊÔÛç$ ]+$/;
    return regex.test( nomeTemplate ) ? true : false;
  }

  definirTipoDado(tipoSelecionado: string) : any{
    switch( tipoSelecionado ){
      case 'TEXTO':
        return TipoDado.TEXTO;

      case 'NÚMERO INTEIRO':
        return TipoDado.NUMERO_INTEIRO;

      case 'NÚMERO DECIMAL':
        return TipoDado.NUMERO_DECIMAL;
      case 'DATA':
        return TipoDado.DATA;
    }
  }

  adicionarCampos(){
    for ( let campo = 0; campo < this.quantidadeCampos; campo++){
      this.camposArray.push({
        nomeCampo: '',
        tipoDado: ''
    });
    }
    this.quantidadeCampos = this.camposArray.length;
  }

  removerCampo(posicao: number){
    if ( posicao !== -1 ){
      this.camposArray.splice(posicao, 1);
      this.quantidadeCampos -= 1;
    }
  }
}
