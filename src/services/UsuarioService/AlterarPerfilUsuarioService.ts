import { Usuario, perfil_usuario } from "../../entities/Usuario";
import { AppDataSource } from "../../server";

type MatriculaRequest = {
    matricula: string;
}

export class AlterarPerfilUsuarioService{
    async execute ( { matricula }: MatriculaRequest ):Promise<Boolean>{
        const usuarioRepository = AppDataSource.getRepository(Usuario);

        const usuarioLocalizado = await usuarioRepository.findOne( { where: { matricula } });
        console.log(matricula, 'MATRICULA');
        
        if( usuarioLocalizado.matricula == matricula ){
            
            if ( usuarioLocalizado.perfil_usuario === perfil_usuario.USUARIO ){
                usuarioLocalizado.perfil_usuario = perfil_usuario.ADMINISTRADOR;
                console.log(usuarioLocalizado, 'Depois');
                await usuarioRepository.save(usuarioLocalizado);
                return true;
            }
            usuarioLocalizado.perfil_usuario = perfil_usuario.USUARIO;
            console.log(usuarioLocalizado, 'Depois');
            usuarioRepository.save(usuarioLocalizado);
            return true;
        }

        return false;
    }
}