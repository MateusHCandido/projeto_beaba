import { AppDataSource } from "../../server";
import { Usuario } from "../../entities/Usuario";


export class BuscarDadosUsuarioService {
    async execute( { matricula } ):Promise<Usuario>{
        const usuarioRepository = AppDataSource.getRepository( Usuario );
        return await usuarioRepository.findOne( {where: { matricula }} );
    }
}

export default BuscarDadosUsuarioService;