import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Usuario} from '../usuario/usuario';
import { Observable } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class UsuarioService{

  constructor( private http: HttpClient ) {}

  cadastrarUsuario(usuario: Usuario) : Observable<Usuario> {
    return this.http.post<Usuario>('http://localhost:3001/usuario/criar', usuario);
  }


  buscarUsuarioMatricula(matriculaLocalizada: any) : Observable<any>{
    return this.http.post<any>('http://localhost:3001/usuario/buscar/matricula', matriculaLocalizada);
  }

  loginUsuario (matricula: string, senha: string) : Observable<Usuario>{
    let dadosLogin = { matricula, senha };    
    return this.http.post<Usuario>('http://localhost:3001/usuario/buscar/login', dadosLogin);
  }

  buscarDadosUsuario(matriculaDeBusca: string): Observable<Usuario> {
    return this.http.get<Usuario>(`http://localhost:3001/usuario/buscar/dados/${matriculaDeBusca}`);
  }
    
  alterarPerfilUsuario(matricula: any): Observable<any>{
    let matriculaDeBusca = { matricula: matricula}
    return this.http.put<any>('http://localhost:3001/usuario/alterar/perfil', matriculaDeBusca);
  }
}
