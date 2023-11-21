import { Usuario } from "../../entities/Usuario";
import { AppDataSource } from "../../server";

type UsuarioRequest = {
    nome_completo: string,
    matricula: string,
    senha: string;
};

export class CriarUsuarioService {

    async execute({nome_completo, matricula, senha}:UsuarioRequest):Promise<Usuario | Error> {
        const usuarioRepository = AppDataSource.getRepository(Usuario);
        

        const usuarioExistente = await usuarioRepository.findOne({ where: { matricula } });
        if(usuarioExistente) {
            return new Error('Matricula já existe');
        }

        const usuario = usuarioRepository.create({
            nome_completo,
            matricula,
            senha
        });

        await usuarioRepository.save(usuario);

        return usuario;
    }
}

export default CriarUsuarioService;
