import { MigrationInterface, QueryRunner } from "typeorm";

export class fixDelete1673898518465 implements MigrationInterface {
    name = 'fixDelete1673898518465'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects_technologies" DROP CONSTRAINT "FK_79d290e6073159e77d8b1c5b4ab"`);
        await queryRunner.query(`ALTER TABLE "projects_technologies" ADD CONSTRAINT "FK_79d290e6073159e77d8b1c5b4ab" FOREIGN KEY ("projectsId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects_technologies" DROP CONSTRAINT "FK_79d290e6073159e77d8b1c5b4ab"`);
        await queryRunner.query(`ALTER TABLE "projects_technologies" ADD CONSTRAINT "FK_79d290e6073159e77d8b1c5b4ab" FOREIGN KEY ("projectsId") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
