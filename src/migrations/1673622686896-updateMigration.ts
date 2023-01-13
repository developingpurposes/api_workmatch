import { MigrationInterface, QueryRunner } from "typeorm";

export class updateMigration1673622686896 implements MigrationInterface {
    name = 'updateMigration1673622686896'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "technologies" DROP COLUMN "icon"`);
        await queryRunner.query(`ALTER TABLE "technologies" ADD "icon" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "technologies" DROP COLUMN "icon"`);
        await queryRunner.query(`ALTER TABLE "technologies" ADD "icon" character varying(50) NOT NULL`);
    }

}
