import { Request, Response } from 'express';
import { CriarUsuarioService } from "../../services/UsuarioService/CriarUsuarioService";


export class CriarUsuarioController{
    async handle(request: Request, response: Response){
        const { nome_completo, matricula, senha } = request.body;

        const usuarioService = new CriarUsuarioService();

        const resultado = await usuarioService.execute({ nome_completo, matricula, senha })

        if(resultado instanceof Error){
            return response.status(400).json(resultado.message);
        }else{
            return response.json(resultado);
        }
    }
}
