import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateCampoTemplate1697468983421 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "SGET".tipo_dado AS ENUM('TEXTO', 'NUMERO_INTEIRO', 'NUMERO_DECIMAL', 'LOGICO');`);

        await queryRunner.createTable(
            new Table({
                name: 'campo_template',
                columns: [
                    {
                        name: 'id_campo_template',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: 'nome_campo',
                        type: 'varchar',
                        length: '20',
                        isNullable: false
                    },
                   {
                    name: 'tipo_dado',
                    type: 'enum',
                    enumName: 'tipo_dado',
                    enum: ['TEXTO', 'NUMERO_INTEIRO', 'NUMERO_DECIMAL', 'LOGICO'],
                    isNullable: false
                   }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('campo_template')
    }

}
