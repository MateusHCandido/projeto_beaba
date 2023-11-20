import { Component } from '@angular/core';
import { UsuarioRequest } from '../../usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {

  nomeCompleto: string = '';
  matricula: string = '';
  senha: string = '';
  confirmacaoSenha: string = '';

  erroMensagemMatricula: boolean = false;
  erroMensagemSenha: boolean = false;
  usuarioCadastrado: boolean = false;
  erroCamposNaoPreenchidos: boolean = false;
  erroValoresMatricula: boolean = false;
 
  constructor(private usuarioService: UsuarioService,
    private router: Router) { }


  onSubmit(){
    this.zerarMensagens();

    let camposPreenchidos = this.validarPreenchimentoCampos(this.nomeCompleto, this.matricula, this.senha, this.confirmacaoSenha);

    // verifica campos preenchidos
    if ( camposPreenchidos ){

      let matriculaInseridaValida = this.validarEntradaMatricula( this.matricula );

      //verifica se matricula contém apenas números
      if ( matriculaInseridaValida ){
        
        let senhaValida = this.validarSenha(this.senha, this.confirmacaoSenha);
        //verifica se senhas são equivalentes
        if ( senhaValida ){
          
          //verifica se matrícula já foi cadastrada em banco
          this.localizarMatricula();
          let matriculaNaoLocalizada = this.erroMensagemMatricula == false ? true : false;
          
          if ( matriculaNaoLocalizada ){
            //conclui cadastrado
            this.cadastrarUsuario();
          }

        } else{
          this.ativarMsgSenha();
        }

      } else{
        this.ativarMsgErroInsercaoMatricula();
      }

    } else {
      this.ativarMsgErroCampos();
    }
  }

  cadastrarUsuario(){
    this.usuarioService
    .cadastrarUsuario( new UsuarioRequest(this.nomeCompleto, this.matricula, this.senha) )
    .subscribe(
      ( validResponse ) => {
        this.zerarMensagens();
        this.usuarioCadastrado = true;
      }
    );
  }
  
  localizarMatricula(){
    this.usuarioService
    .buscarUsuarioMatricula( this.matricula )
    .subscribe(
      ( buscaReponse ) => {
        if ( buscaReponse.matriculaLocalizada ){
          this.ativarMsgMatriculaLocalizada();
        }
      }
    );
  }

  validarPreenchimentoCampos(nomeCompleto: string, matricula: string, senha: string, confirmacaoSenha: string){
    return nomeCompleto != '' && matricula != '' && senha != '' && confirmacaoSenha != '' ? true : false
  }

  validarSenha(senha: string, confirmacaoSenha: string){
    let senhasPreenchidas = senha != '' || confirmacaoSenha != ''? true : false;
    let senhaIguais = senha == confirmacaoSenha? true : false;

    return senhaIguais && senhasPreenchidas;
  }

  validarEntradaMatricula( matricula: string ): Boolean{
    const regex = /^[0-9]+$/;
    matricula = matricula.trim().toString();
    return regex.test( matricula ) ? true : false;
  }

  zerarMensagens(){
    this.erroMensagemMatricula = false;
    this.erroMensagemSenha = false;
    this.erroCamposNaoPreenchidos = false;
    this.erroValoresMatricula = false;
    this.usuarioCadastrado = false;
  }

  ativarMsgErroCampos(){
    this.erroCamposNaoPreenchidos = true;

    this.erroMensagemMatricula = false;
    this.erroMensagemSenha = false;
    this.erroValoresMatricula = false;
  }

  ativarMsgErroInsercaoMatricula(){
    this.erroValoresMatricula = true;

    this.erroCamposNaoPreenchidos = false;
    this.erroMensagemMatricula = false;
    this.erroMensagemSenha = false;
  }

  ativarMsgSenha(){
    this.erroMensagemSenha = true;

    this.erroValoresMatricula = false;
    this.erroCamposNaoPreenchidos = false;
    this.erroMensagemMatricula = false;
  }

  ativarMsgMatriculaLocalizada(){
    this.erroMensagemMatricula = true;

    this.erroMensagemSenha = false;
    this.erroValoresMatricula = false;
    this.erroCamposNaoPreenchidos = false;
  }
}


