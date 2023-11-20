import { MigrationInterface, QueryRunner } from "typeorm"

export class UpdateEnumCampoTemplate1697819442954 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "SGET".tipo_dado ADD VALUE 'DATA';`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
