import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/usuario/usuario';
import { DialogoConfirmacaoComponent } from './dialogo-confirmacao/dialogo-confirmacao.component';

@Component({
  selector: 'app-alterar-perfil',
  templateUrl: './alterar-perfil.component.html',
  styleUrls: ['./alterar-perfil.component.css']
})
export class AlterarPerfilComponent{

  adminDisabled: boolean = true;
  userDisabled: boolean = true;

  matriculaDeBusca: string = '';
  usuarioLogado: any;

  usuarioLocalizado: any = false;
  usuarioBuscado!: Usuario;

  nomeCompleto: any = '';
  matricula: any = '';
  perfil_usuario: any;
 
  usuarioNaoLocalizado = false;

  constructor(private usuarioService: UsuarioService,
    private matDialog: MatDialog) {}

  buscarUsuario(){
    this.usuarioService.buscarDadosUsuario( this.matriculaDeBusca )
      .subscribe( (response : Usuario ) => {
        if ( this.matriculaDeBusca == response.matricula ){

          this.usuarioNaoLocalizado = false;
          this.usuarioLocalizado = true;
          this.usuarioBuscado = response;

          console.log(this.usuarioBuscado);

          if ( this.usuarioBuscado.perfil_usuario === 'ADMINISTRADOR'){
            this.userDisabled = false;
            this.adminDisabled = true;
          } else if ( this.usuarioBuscado.perfil_usuario === 'USUARIO' ){
            this.userDisabled = true;
            this.adminDisabled = false;
          }

        }
      },
      ( error ) => {
          console.log(error.status);
          this.usuarioLocalizado = false;
          this.usuarioNaoLocalizado = true;
      }
      )
  }


  alterarPerfil(): void{
    const dialogoReferencia = this.matDialog.open(DialogoConfirmacaoComponent, {
      width: '80vw',
      height: '40vh',
      data: this.usuarioBuscado,
    });


    dialogoReferencia.afterClosed().subscribe(permitirAlteracao =>{
      if ( permitirAlteracao ){

        if (this.usuarioBuscado.matricula === this.matriculaDeBusca) {
          this.usuarioService.alterarPerfilUsuario(this.matriculaDeBusca).subscribe();
          this.selecaoBuscaUsuario();
        }   

      }
    })
    
    
  }



  selecaoBuscaUsuario(){
    this.usuarioService.buscarDadosUsuario(this.matriculaDeBusca).subscribe(
      (response : Usuario)=> {
        this.usuarioBuscado.perfil_usuario = response.perfil_usuario;

        if ( this.usuarioBuscado.perfil_usuario === 'ADMINISTRADOR'){
          this.userDisabled = false;
          this.adminDisabled = true;
          console.log(this.usuarioBuscado.perfil_usuario);
        } else if ( this.usuarioBuscado.perfil_usuario === 'USUARIO' ){
          this.userDisabled = true;
          this.adminDisabled = false;
          console.log(this.usuarioBuscado.perfil_usuario);
        }
      }
    )
  }
}

