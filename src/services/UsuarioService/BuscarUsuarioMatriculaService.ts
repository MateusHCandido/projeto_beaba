import { AppDataSource } from "../../server";
import { Usuario } from "../../entities/Usuario";

type MatriculaRequest = {
    matricula: string;
}

export class BuscarUsuarioMatriculaService {
    async execute( {matricula} : MatriculaRequest):Promise<Boolean>{
        const usuarioRepository = AppDataSource.getRepository(Usuario);

        const  matriculaLocalizada = await usuarioRepository.findOne({where: {matricula} });
        
        if( matriculaLocalizada != null ){
            return true;
        }else{
            return false;
        }
    }
}

export default BuscarUsuarioMatriculaService;