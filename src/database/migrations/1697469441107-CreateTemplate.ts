import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateTemplate1697469441107 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`CREATE TYPE "SGET".status_template AS ENUM('ATIVO', 'INATIVO');`);

        await queryRunner.createTable(
            new Table({
                name: 'template',
                columns: [
                    {
                        name: 'id_template',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: 'nome_template',
                        type: 'varchar',
                        length: '50',
                        isNullable: false
                    },
                    {
                        name: 'extensao_arquivo',
                        type: 'varchar',
                        length: '5',
                        isNullable: false
                    },
                    {
                        name: 'data_criacao',
                        type: 'timestamp',
                        default: 'now()'
                    },{
                        name: 'quantidade_campos',
                        type: 'integer',
                        isNullable: false
                    },
                    {
                        name: 'status_template',
                        type: 'enum',
                        enumName: 'status_template',
                        enum: ['ATIVO', 'INATIVO'],
                    },{
                        name: 'matricula_criador_template',
                        type: 'varchar',
                        length: '15'
                    }
                ],
                foreignKeys: [
                    {
                        name: 'matricula_criador_template',
                        columnNames: ['matricula_criador_template'],
                        referencedTableName: 'usuario',
                        referencedColumnNames: ['matricula']
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('template')
    }

}
