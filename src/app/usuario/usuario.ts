enum PerfilUsuario {
    ADMINISTRADOR = 'ADMINISTRADOR',
    USUARIO = 'USUARIO',
  }
  
  enum StatusUsuario {
    ATIVO = 'ATIVO',
    INATIVO = 'INATIVO',
  }
  
  export class Usuario {
    id_usuario?: string;
    nome_completo?: string;
    matricula?: string;
    senha?: string;
    perfil_usuario?: PerfilUsuario;
    status_usuario?: StatusUsuario;

    constructor(usuario: Usuario){
      this.id_usuario = usuario.id_usuario;
      this.nome_completo = usuario.nome_completo;
      this.matricula = usuario.matricula;
      this.senha = usuario.senha;
      this.perfil_usuario = usuario.perfil_usuario;
      this.status_usuario = usuario.status_usuario;
    }
}

export class UsuarioRequest {
  id_usuario!: string;
  nome_completo: string;
  matricula: string;
  senha: string;
  perfil_usuario : PerfilUsuario = PerfilUsuario.USUARIO;
  status_usuario: StatusUsuario = StatusUsuario.ATIVO;

  constructor(nomeCompleto: string, matricula: string, senha: string){
    this.nome_completo = nomeCompleto;
    this.matricula = matricula;
    this.senha = senha;
  }
}