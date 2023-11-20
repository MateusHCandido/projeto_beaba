import 'reflect-metadata'

import express from 'express';
import cors from 'cors';
import { rotas } from './rotas';


import { DataSource} from "typeorm";
import { Usuario } from './entities/Usuario';
import { CreateUsuario1696435513899 } from './database/migrations/1696435513899-CreateUsuario';
import { CreateCampoTemplate1697468983421 } from './database/migrations/1697468983421-CreateCampoTemplate';
import { CreateTemplate1697469441107 } from './database/migrations/1697469441107-CreateTemplate';
import { CreateArquivoUpload1697474042173 } from './database/migrations/1697474042173-CreateArquivoUpload';
import { UpdateEnumCampoTemplate1697819442954 } from './database/migrations/1697819442954-UpdateEnumCampoTemplate';
import { CreateTabelaAuxiliarTemplateCamposTemplate1698067883051 } from './database/migrations/1698067883051-CreateTabelaAuxiliarTemplateCamposTemplate';

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "SGET",
    schema: "SGET",
    synchronize: true,
    logging: true,
    entities: [Usuario],
    migrations: [CreateUsuario1696435513899, CreateCampoTemplate1697468983421, CreateTemplate1697469441107, CreateArquivoUpload1697474042173, UpdateEnumCampoTemplate1697819442954, CreateTabelaAuxiliarTemplateCamposTemplate1698067883051]
})


AppDataSource.initialize()
.then(() => {
    console.log("Data Source has been initialized!")
    const app = express();

    app.use(cors( {origin: 'http://localhost:4200'} ));
    app.use(express.json());
    app.use(rotas);

app.listen(3001, 'localhost', () => console.log('servidor está em andamento'));
})
.catch((err) => {
    console.error("Error during Data Source initialization", err)
})

