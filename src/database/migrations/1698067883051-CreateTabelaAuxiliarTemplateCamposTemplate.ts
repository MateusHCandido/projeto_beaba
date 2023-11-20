import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateTabelaAuxiliarTemplateCamposTemplate1698067883051 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'template_campo_template',
                columns: [
                    {
                        name: 'id_template_campo_template',
                        type: 'SERIAL',
                        isPrimary: true
                    },
                    {
                        name: 'id_template',
                        type: 'int',
                        isNullable: false
                    },
                    {
                        name: 'id_campo_template',
                        type: 'int',
                        isNullable: false
                    },
                ],
                foreignKeys: [
                    {
                        name: 'template_campo_template_template_fk',
                        columnNames: ['id_template'],
                        referencedTableName: 'template',
                        referencedColumnNames: ['id_template'],
                        onDelete: 'CASCADE'
                    }, {
                        name: 'template_campo_template_campo_template_fk',
                        columnNames: ['id_campo_template'],
                        referencedTableName: 'campo_template',
                        referencedColumnNames: ['id_campo_template'],
                        onDelete: 'CASCADE'
                    }
                ]
            }));
    
        }


    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('template_campo_template');
    }

}
