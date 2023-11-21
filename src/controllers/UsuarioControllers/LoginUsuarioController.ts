import { Request, Response } from "express";
import { BuscarDadosUsuarioService } from "../../services/UsuarioService/BuscarDadosUsuarioService";
import ValidarDadosLoginService from "../../services/UsuarioService/ValidarDadosLoginService";


export class LoginUsuarioController{
    async handle(request: Request, response: Response){
        const { matricula, senha } = request.body;
        
        const buscarDadosUsuario = new BuscarDadosUsuarioService();
        const validarLoginUsuario = new ValidarDadosLoginService();
        
        const dadosValidos = await validarLoginUsuario.execute( { matricula, senha } );

        return dadosValidos?
            response.status(200).send(await buscarDadosUsuario.execute( { matricula } )).get 
            : 
            response.status(400).send('Matrícula ou senha incorretos'); 
            
    }
}