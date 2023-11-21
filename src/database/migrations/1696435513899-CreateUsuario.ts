import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateUsuario1696435513899 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "SGET".perfil AS ENUM('ADMINISTRADOR', 'USUARIO');`);

        await queryRunner.query(`CREATE TYPE "SGET".status_usuario AS ENUM('ATIVO', 'INATIVO');`);
        
        await queryRunner.createTable(
            new Table({
                name: 'usuario',
                columns: [
                    {
                        name: 'id_usuario',
                        type: 'uuid',
                        isPrimary: true
                    },
                    {
                        name: 'nome_completo',
                        type: 'varchar',
                        length: '100',
                        isNullable: false
                    },
                    {
                        name: 'matricula',
                        type: 'varchar',
                        length: '15',
                        isUnique: true
                    },
                    {
                        name: 'perfil_usuario',
                        type: 'enum',
                        enumName: 'perfil_usuario', 
                        enum: ['ADMINISTRADOR', 'USUARIO'], 
                        default: "'USUARIO'", 
                        isNullable: false
                    },
                    {
                        name: 'senha',
                        type: 'text',
                        isNullable: false,
                    },
                    {
                        name: 'status_usuario',
                        type: 'enum',
                        enumName: 'status_usuario', 
                        enum: ['ATIVO', 'INATIVO'], 
                        default: "'ATIVO'", 
                        isNullable: false
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('usuario');
    }

}
