import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1673631174896 implements MigrationInterface {
    name = 'migrations1673631174896'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(50) NOT NULL, "password" character varying NOT NULL, "username" character varying(50) NOT NULL, "name" character varying(50) NOT NULL, "avatarUrl" character varying, "bio" character varying(300), "level" character varying(30), "contact" character varying(100), "isActive" boolean NOT NULL DEFAULT true, "isAdm" boolean DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users_technologies" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid, "technologiesId" uuid, CONSTRAINT "PK_958d4d90a76dec48d6088a3394b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "technologies" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "icon" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_9a97465b79568f00becacdd4e4a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "projects_technologies" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "projectsId" uuid, "technologiesId" uuid, CONSTRAINT "PK_0216cd62ab5f3228a8efc1f31cf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "projects" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "imgUrl" character varying, "description" character varying, "maxTeamSize" integer NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "ownerId" uuid, CONSTRAINT "UQ_2187088ab5ef2a918473cb99007" UNIQUE ("name"), CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "projects_queue" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isConfirmed" boolean NOT NULL DEFAULT false, "userId" uuid, "projectsId" uuid, CONSTRAINT "PK_86dea00a5deb1aac85e19395540" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users_technologies" ADD CONSTRAINT "FK_d33dd73ff3ee2296b3060abd58b" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_technologies" ADD CONSTRAINT "FK_5ef99b9c1f40be0e8a8d46ccde1" FOREIGN KEY ("technologiesId") REFERENCES "technologies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "projects_technologies" ADD CONSTRAINT "FK_79d290e6073159e77d8b1c5b4ab" FOREIGN KEY ("projectsId") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "projects_technologies" ADD CONSTRAINT "FK_ba3a0fa25ba070658c0db2aa3ce" FOREIGN KEY ("technologiesId") REFERENCES "technologies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "projects" ADD CONSTRAINT "FK_a8e7e6c3f9d9528ed35fe5bae33" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "projects_queue" ADD CONSTRAINT "FK_aaddfa7a143ddc961a376c3e58a" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "projects_queue" ADD CONSTRAINT "FK_c83be2df52edad30df3263daa47" FOREIGN KEY ("projectsId") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects_queue" DROP CONSTRAINT "FK_c83be2df52edad30df3263daa47"`);
        await queryRunner.query(`ALTER TABLE "projects_queue" DROP CONSTRAINT "FK_aaddfa7a143ddc961a376c3e58a"`);
        await queryRunner.query(`ALTER TABLE "projects" DROP CONSTRAINT "FK_a8e7e6c3f9d9528ed35fe5bae33"`);
        await queryRunner.query(`ALTER TABLE "projects_technologies" DROP CONSTRAINT "FK_ba3a0fa25ba070658c0db2aa3ce"`);
        await queryRunner.query(`ALTER TABLE "projects_technologies" DROP CONSTRAINT "FK_79d290e6073159e77d8b1c5b4ab"`);
        await queryRunner.query(`ALTER TABLE "users_technologies" DROP CONSTRAINT "FK_5ef99b9c1f40be0e8a8d46ccde1"`);
        await queryRunner.query(`ALTER TABLE "users_technologies" DROP CONSTRAINT "FK_d33dd73ff3ee2296b3060abd58b"`);
        await queryRunner.query(`DROP TABLE "projects_queue"`);
        await queryRunner.query(`DROP TABLE "projects"`);
        await queryRunner.query(`DROP TABLE "projects_technologies"`);
        await queryRunner.query(`DROP TABLE "technologies"`);
        await queryRunner.query(`DROP TABLE "users_technologies"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
