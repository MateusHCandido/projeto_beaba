import { Request, Response } from "express";
import { BuscarDadosUsuarioService } from "../../services/UsuarioService/BuscarDadosUsuarioService";
import { BuscarUsuarioMatriculaService } from "../../services/UsuarioService/BuscarUsuarioMatriculaService";

export class BuscarDadosUsuarioController{
    async handle ( request: Request, response: Response){
        const { matricula } = request.params;

        const buscarDados = new BuscarDadosUsuarioService();
        const buscarMatricula = new BuscarUsuarioMatriculaService()
        
        const matriculaLocalizada = await buscarMatricula.execute( { matricula });

        if (matriculaLocalizada) {
            return response.status(200).send( await buscarDados.execute( { matricula} ) );
        } 
        return response.status(404).send( 'usuario não localizado' )
        
    }
}