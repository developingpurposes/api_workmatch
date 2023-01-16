import { MigrationInterface, QueryRunner } from "typeorm";

export class fixOnDeleteCascade1673898687363 implements MigrationInterface {
    name = 'fixOnDeleteCascade1673898687363'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects_technologies" DROP CONSTRAINT "FK_ba3a0fa25ba070658c0db2aa3ce"`);
        await queryRunner.query(`ALTER TABLE "projects_technologies" ADD CONSTRAINT "FK_ba3a0fa25ba070658c0db2aa3ce" FOREIGN KEY ("technologiesId") REFERENCES "technologies"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects_technologies" DROP CONSTRAINT "FK_ba3a0fa25ba070658c0db2aa3ce"`);
        await queryRunner.query(`ALTER TABLE "projects_technologies" ADD CONSTRAINT "FK_ba3a0fa25ba070658c0db2aa3ce" FOREIGN KEY ("technologiesId") REFERENCES "technologies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
