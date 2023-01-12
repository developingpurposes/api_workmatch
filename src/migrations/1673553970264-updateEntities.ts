import { MigrationInterface, QueryRunner } from "typeorm";

export class updateEntities1673553970264 implements MigrationInterface {
    name = 'updateEntities1673553970264'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects" DROP CONSTRAINT "FK_361a53ae58ef7034adc3c06f09f"`);
        await queryRunner.query(`ALTER TABLE "projects" RENAME COLUMN "userId" TO "ownerIdId"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "password" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "avatarUrl"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "avatarUrl" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "isAdm" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "imgUrl"`);
        await queryRunner.query(`ALTER TABLE "projects" ADD "imgUrl" character varying`);
        await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "projects" ADD "description" character varying`);
        await queryRunner.query(`ALTER TABLE "projects" ADD CONSTRAINT "FK_1dc957e74827898c58e39c35413" FOREIGN KEY ("ownerIdId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects" DROP CONSTRAINT "FK_1dc957e74827898c58e39c35413"`);
        await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "projects" ADD "description" character varying(300)`);
        await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "imgUrl"`);
        await queryRunner.query(`ALTER TABLE "projects" ADD "imgUrl" character varying(100)`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "isAdm" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "avatarUrl"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "avatarUrl" character varying(50)`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "password" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "projects" RENAME COLUMN "ownerIdId" TO "userId"`);
        await queryRunner.query(`ALTER TABLE "projects" ADD CONSTRAINT "FK_361a53ae58ef7034adc3c06f09f" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
