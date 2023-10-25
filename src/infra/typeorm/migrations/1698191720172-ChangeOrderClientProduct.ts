import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeOrderClientProduct1698191720172 implements MigrationInterface {
    name = 'ChangeOrderClientProduct1698191720172'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(25) NOT NULL, "description" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_9004ab74b495518b3dee4f4222a" UNIQUE ("name"), CONSTRAINT "PK_537b5c00afe7427c4fc9434cd59" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(25) NOT NULL, "description" character varying NOT NULL, "price" double precision NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "categoryId" uuid, CONSTRAINT "UQ_26c9336d231c4e90419a5954bd7" UNIQUE ("name"), CONSTRAINT "PK_36a07cc432789830e7fb7b58a83" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."Orders_status_enum" AS ENUM('RECEBIDO', 'EM_PREPARACAO', 'PRONTO', 'FINALIZADO')`);
        await queryRunner.query(`CREATE TABLE "Orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" "public"."Orders_status_enum" NOT NULL DEFAULT 'EM_PREPARACAO', "total" double precision NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "clientId" uuid, CONSTRAINT "PK_ce8e3c4d56e47ff9c8189c26213" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Clients" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "cpf" character varying(11) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8dadaa0dc6305d95e1d1a6b9544" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Products" ADD CONSTRAINT "FK_85fdee89fa67fcdce66863def29" FOREIGN KEY ("categoryId") REFERENCES "Categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Orders" ADD CONSTRAINT "FK_2f1b0f9d985a2a60d798bf5e75e" FOREIGN KEY ("clientId") REFERENCES "Clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Orders" DROP CONSTRAINT "FK_2f1b0f9d985a2a60d798bf5e75e"`);
        await queryRunner.query(`ALTER TABLE "Products" DROP CONSTRAINT "FK_85fdee89fa67fcdce66863def29"`);
        await queryRunner.query(`DROP TABLE "Clients"`);
        await queryRunner.query(`DROP TABLE "Orders"`);
        await queryRunner.query(`DROP TYPE "public"."Orders_status_enum"`);
        await queryRunner.query(`DROP TABLE "Products"`);
        await queryRunner.query(`DROP TABLE "Categories"`);
    }

}
