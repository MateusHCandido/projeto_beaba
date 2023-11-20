import { Request, Response } from "express";
import { BuscarUsuarioMatriculaService } from "../../services/UsuarioService/BuscarUsuarioMatriculaService";



export class BuscarUsuarioMatriculaController{
    async handle(request: Request, response: Response){
        const { matricula } = request.body;
        
        const usuarioService = new BuscarUsuarioMatriculaService();

        const matriculaLocalizada = await usuarioService.execute({ matricula });
        if( matriculaLocalizada  ){
            return response.status(200).json({matriculaLocalizada: true});
        }else{
            return response.status(400).send({matriculaLocalizada: false});
        }
    }
}