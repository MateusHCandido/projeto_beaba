import { Request, Response } from "express";
import { AlterarPerfilUsuarioService } from "../../services/UsuarioService/AlterarPerfilUsuarioService";

export class AlterarPerfilUsuarioController{
    async handle ( request: Request, response: Response ){
        const { matricula } = request.body;
        
        const usuarioService = new AlterarPerfilUsuarioService();

        const alteracaoPerfilRealizada = await usuarioService.execute({ matricula });
        
        return alteracaoPerfilRealizada? response.status(204).json('O perfil do usuário foi alterado')
        :
        response.status(404).json('Matricula não localizada');
    }
}