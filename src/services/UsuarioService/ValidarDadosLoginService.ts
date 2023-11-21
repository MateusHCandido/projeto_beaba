import bcrypt from 'bcryptjs';
import { AppDataSource } from "../../server";
import { Usuario } from '../../entities/Usuario';




export class ValidarDadosLoginService{
    async execute ( {matricula, senha} ):Promise<Boolean>{
        const usuarioRepository = AppDataSource.getRepository(Usuario);
        const usuarioLocalizado = await usuarioRepository.findOne( {where: { matricula }} );

        if ( usuarioLocalizado != null ){
            let senhasEquivalentes = await bcrypt.compare(senha, usuarioLocalizado.senha);
            return await senhasEquivalentes? true : false;
        }

        return false; 
    }
}

export default ValidarDadosLoginService;