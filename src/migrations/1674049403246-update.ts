import { MigrationInterface, QueryRunner } from "typeorm";

export class update1674049403246 implements MigrationInterface {
    name = 'update1674049403246'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_technologies" DROP CONSTRAINT "FK_d33dd73ff3ee2296b3060abd58b"`);
        await queryRunner.query(`ALTER TABLE "users_technologies" DROP CONSTRAINT "FK_5ef99b9c1f40be0e8a8d46ccde1"`);
        await queryRunner.query(`ALTER TABLE "users_technologies" ADD CONSTRAINT "FK_d33dd73ff3ee2296b3060abd58b" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_technologies" ADD CONSTRAINT "FK_5ef99b9c1f40be0e8a8d46ccde1" FOREIGN KEY ("technologiesId") REFERENCES "technologies"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_technologies" DROP CONSTRAINT "FK_5ef99b9c1f40be0e8a8d46ccde1"`);
        await queryRunner.query(`ALTER TABLE "users_technologies" DROP CONSTRAINT "FK_d33dd73ff3ee2296b3060abd58b"`);
        await queryRunner.query(`ALTER TABLE "users_technologies" ADD CONSTRAINT "FK_5ef99b9c1f40be0e8a8d46ccde1" FOREIGN KEY ("technologiesId") REFERENCES "technologies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_technologies" ADD CONSTRAINT "FK_d33dd73ff3ee2296b3060abd58b" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
