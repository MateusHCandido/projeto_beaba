import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateArquivoUpload1697474042173 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        
        await queryRunner.createTable(
            new Table({
                name: 'arquivo_upload',
                columns: [
                    {
                        name: 'id_arquivo_upload',
                        type: 'serial',
                        isPrimary: true
                    }
                    ,{
                        name: 'nome_arquivo',
                        type: 'varchar',
                        length: '100',
                        isNullable: false
                    },
                    {
                        name: 'caminho_upload_arquivo',
                        type: 'varchar',
                        length: '100',
                        isNullable: false,
                        isUnique: true
                    },
                    {
                        name: 'data_registro_arquivo',
                        type: 'timestamp',
                        default: 'now()'
                    },
                    {
                        name: 'matricula_criador_arquivo',
                        type: 'varchar',
                        length: '15',
                        isNullable: false
                    },
                    {
                        name: 'id_template_referencia',
                        type: 'int',
                        isNullable: false
                    }
                ],
                foreignKeys: [
                    {
                        name: 'matricula_criador_template',
                        columnNames: ['matricula_criador_arquivo'],
                        referencedTableName: 'usuario',
                        referencedColumnNames: ['matricula']
                    },
                    {
                        name: 'id_template_referencia',
                        columnNames: ['id_template_referencia'],
                        referencedTableName: 'template',
                        referencedColumnNames: ['id_template']
                   }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('arquivo_upload')
    }

}
