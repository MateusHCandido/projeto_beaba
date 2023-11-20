import { Router } from "express";
import { CriarUsuarioController } from "./controllers/UsuarioControllers/CriarUsuarioController";
import { BuscarUsuarioMatriculaController } from "./controllers/UsuarioControllers/BuscarUsuarioMatriculaController";
import { LoginUsuarioController } from "./controllers/UsuarioControllers/LoginUsuarioController";
import { AlterarPerfilUsuarioController } from "./controllers/UsuarioControllers/AlterarPerfilUsuarioController";
import { BuscarDadosUsuarioController } from "./controllers/UsuarioControllers/BuscarDadosUsuarioController";

const rotas = Router();

rotas.post('/usuario/criar', new CriarUsuarioController().handle);
rotas.post('/usuario/buscar/matricula', new BuscarUsuarioMatriculaController().handle);
rotas.post('/usuario/buscar/login', new LoginUsuarioController().handle);
rotas.put('/usuario/alterar/perfil', new AlterarPerfilUsuarioController().handle);
rotas.get('/usuario/buscar/dados/:matricula', new BuscarDadosUsuarioController().handle);
    

export { rotas }