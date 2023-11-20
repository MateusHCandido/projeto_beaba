import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { ArquivoService } from 'src/app/services/arquivo.service';
import { Usuario } from 'src/app/usuario/usuario';
import { CompartilharDadosService } from 'src/app/services/compartilhar-dados.service';



@Component({
  selector: 'app-arquivos-cadastrados',
  templateUrl: './arquivos-cadastrados.component.html',
  styleUrls: ['./arquivos-cadastrados.component.css']
})
export class ArquivosCadastradosComponent{

  arquivoParaUpload: File | null = null;
  idTemplate!: string;
  usuario = new Usuario(this.dadosUsuario.getDados());

  mensagemArquivoValido: boolean  = false;
  mensagemArquivoInvalido: boolean  = false;

  barraCarregando: boolean = false;

  opcoes: string[] = [
    'QQ - ADMINISTRATIVO',
    'QQ - FINANCEIRO',
    'QQ - MARKETING',
    'QQ - RECURSOS HUMANOS',
    'QQ - TECNOLOGIA',
    'QQ - OUTROS'
  ];
  opcaoSelecionada: string = '';

  constructor(private arquivoService: ArquivoService, private router: Router, private dadosUsuario: CompartilharDadosService) { }


  validarArquivoEnviado(event: any){
    this.arquivoParaUpload = event.target.files.item(0);
  }

  levarParaValidacao(){
    this.mensagemArquivoInvalido = false;
    this.mensagemArquivoValido = false;
    this.barraCarregando = true;
    if (this.arquivoParaUpload){
      

      const dadosArquivo: FormData = new FormData();
      const matriculaCriador: any = this.usuario.matricula;
      
      dadosArquivo.append('idTemplate', this.idTemplate);
      dadosArquivo.append('matriculaCriador', matriculaCriador);
      dadosArquivo.append('pasta_destino', this.opcaoSelecionada);
      dadosArquivo.append('file', this.arquivoParaUpload, this.arquivoParaUpload.name);
    
      this.arquivoService.validarArquivo(dadosArquivo)
      .subscribe( ( response ) => {
        this.mensagemArquivoInvalido = false;
        this.barraCarregando = false;
        this.mensagemArquivoValido = true;
        
      },
      ( responseErro ) => {
        this.barraCarregando = false;
        this.mensagemArquivoInvalido = true;
      });
    }
  }

  
}
