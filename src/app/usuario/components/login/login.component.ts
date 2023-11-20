import { Component, OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import { CompartilharDadosService } from 'src/app/services/compartilhar-dados.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from '../../usuario';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy{
  private subscription!: Subscription;
  matricula: string = '';
  senha: string = '';

  ocorreuErro: boolean = false;
  camposNaoPreenchidos: boolean = false;
  
  constructor(private router: Router,
              private compartilharDadosService: CompartilharDadosService,
              private usuarioService: UsuarioService){}
  


  fazerLogin() {
    if( this.matricula == '' || this.senha == ''){
      this.ocorreuErro = false;
      this.camposNaoPreenchidos = true;
    }else{
      this.subscription = this.usuarioService.loginUsuario(this.matricula, this.senha).subscribe(
        (usuario_response: Usuario) => {
          if (usuario_response.status_usuario === 'ATIVO') {
            const usuario = new Usuario(usuario_response); 
            this.compartilharDadosService.setDados(usuario);
  
            this.router.navigate(['/arquivos/dashboard/info']);
          }
        },
        (error) => {
          if (error.status == 400){
            this.matricula = ''
            this.senha = ''
            this.camposNaoPreenchidos = false;
            this.ocorreuErro = true;
          }
        }
      );
    }
  
    }
  ngOnDestroy(): void {
  }        
    
      
}
      


