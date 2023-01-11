import { MigrationInterface, QueryRunner } from "typeorm";

export class fixUsers1673430913318 implements MigrationInterface {
    name = 'fixUsers1673430913318'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "name" character varying(50) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "name"`);
    }

}
