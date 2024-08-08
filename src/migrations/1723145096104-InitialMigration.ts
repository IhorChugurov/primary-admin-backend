import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1723145096104 implements MigrationInterface {
  name = "InitialMigration1723145096104";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."entity_field_type_enum" AS ENUM('select', 'multipleSelect', 'text', 'textarea', 'number', 'date', 'boolean', 'radio', 'customTextarea')`,
    );
    await queryRunner.query(
      `CREATE TABLE "entity_field" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, "type" "public"."entity_field_type_enum" NOT NULL, "required" boolean NOT NULL DEFAULT true, "requiredText" character varying, "label" character varying NOT NULL, "placeholder" character varying, "description" character varying, "forCreatePage" boolean NOT NULL DEFAULT true, "forEditPage" boolean NOT NULL DEFAULT true, "forEditPageDisabled" boolean NOT NULL DEFAULT false, "entityDefinitionId" uuid NOT NULL, "selectorSourceId" uuid, CONSTRAINT "UQ_2c9f123eb5bf4754f9a34bec6cd" UNIQUE ("name", "entityDefinitionId"), CONSTRAINT "PK_c202ad849b7f4be70c1e926c632" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."entity_definition_type_enum" AS ENUM('primary', 'secondary', 'triary')`,
    );
    await queryRunner.query(
      `CREATE TABLE "entity_definition" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, "url" character varying NOT NULL, "tableName" character varying NOT NULL, "description" character varying, "type" "public"."entity_definition_type_enum" NOT NULL, "projectId" uuid NOT NULL, CONSTRAINT "UQ_f1ce06ab022c86d810f591b803c" UNIQUE ("tableName", "projectId"), CONSTRAINT "PK_b47ba1dc64da8571f1e8cfcf09b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."environment_valuetype_enum" AS ENUM('string', 'boolean', 'number', 'date')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."environment_destination_enum" AS ENUM('first', 'second', 'project')`,
    );
    await queryRunner.query(
      `CREATE TABLE "environment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "key" character varying NOT NULL, "valueType" "public"."environment_valuetype_enum" NOT NULL, "destination" "public"."environment_destination_enum" NOT NULL, "label" character varying NOT NULL, "placeholder" character varying, "description" character varying, "projectId" uuid NOT NULL, CONSTRAINT "UQ_b91b7aea84ac60ff9c6a2ff21d7" UNIQUE ("key", "projectId"), CONSTRAINT "PK_f0ec97d0ac5e0e2f50f7475699f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "facility_role" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying, "projectId" uuid NOT NULL, CONSTRAINT "UQ_193bdb12f4a594045c09a3bbb73" UNIQUE ("name", "projectId"), CONSTRAINT "PK_d5ed46323cc0197d61bfaecde0a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "facility_user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "userId" uuid NOT NULL, "facilityId" uuid NOT NULL, "facilityRoleId" uuid NOT NULL, "projectId" uuid NOT NULL, CONSTRAINT "UQ_243572292cb06ec9595c3aeed45" UNIQUE ("userId", "facilityId", "projectId"), CONSTRAINT "PK_718ea53c03fe54c85a6b6e8cf8e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "group" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying, CONSTRAINT "UQ_8a45300fd825918f3b40195fbdc" UNIQUE ("name"), CONSTRAINT "PK_256aa0fda9b1de1a73ee0b7106b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "facility" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying, "groupId" uuid NOT NULL, CONSTRAINT "UQ_7406a0e8568837e5c8eb105a9f4" UNIQUE ("name"), CONSTRAINT "PK_07c6c82781d105a680b5c265be6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "environment_value" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "value" jsonb NOT NULL, "environmentId" uuid NOT NULL, "projectId" uuid, "facilityId" uuid, CONSTRAINT "UQ_28b51f8dd42eb73b2e9ab9671fa" UNIQUE ("environmentId", "facilityId", "projectId"), CONSTRAINT "PK_a897405fed32aa994a8c183e189" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "project" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying, CONSTRAINT "UQ_dedfea394088ed136ddadeee89c" UNIQUE ("name"), CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "group_role" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying, "projectId" uuid NOT NULL, CONSTRAINT "UQ_7944e55bfbcac28279602368c3e" UNIQUE ("name", "projectId"), CONSTRAINT "PK_0fd3365b65e6121a0ef0cb7cb6e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "group_user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "userId" uuid NOT NULL, "groupId" uuid NOT NULL, "groupRoleId" uuid NOT NULL, "projectId" uuid NOT NULL, CONSTRAINT "UQ_03b8e3628de0c7c1e3ad3b680f0" UNIQUE ("userId", "groupId", "projectId"), CONSTRAINT "PK_c637f43a6f0d7891fec59f4d7a7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "refresh_token" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "userId" uuid NOT NULL, CONSTRAINT "PK_b575dd3c21fb0831013c909e7fe" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "primary_role" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying, CONSTRAINT "UQ_3d29ef0fb358a20ade9eef2d36d" UNIQUE ("name"), CONSTRAINT "PK_973a560bba7f7e79cd9887e67e4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "primary_user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "userId" uuid NOT NULL, "primaryRoleId" uuid NOT NULL, CONSTRAINT "REL_ccfb6f8f8288e42fcc830f9aa6" UNIQUE ("userId"), CONSTRAINT "PK_680586b98b7acff4d42a7aac0d1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "entity_field" ADD CONSTRAINT "FK_90e90ab7748783ac4e925479fef" FOREIGN KEY ("entityDefinitionId") REFERENCES "entity_definition"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "entity_field" ADD CONSTRAINT "FK_009c6e9cf5fb119a7d0e1ac4884" FOREIGN KEY ("selectorSourceId") REFERENCES "entity_definition"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "entity_definition" ADD CONSTRAINT "FK_0947f2c04c4a697447afe305c1d" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "environment" ADD CONSTRAINT "FK_59c6a9ee3ec6120664d78e6488d" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility_role" ADD CONSTRAINT "FK_aec906f4ffc469cda9020112419" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility_user" ADD CONSTRAINT "FK_2325edd17c8fe8cd5239f05e5b4" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility_user" ADD CONSTRAINT "FK_ae3cacbc390aef6d3e707747d00" FOREIGN KEY ("facilityId") REFERENCES "facility"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility_user" ADD CONSTRAINT "FK_00887e31c8f25ffbac20953b73b" FOREIGN KEY ("facilityRoleId") REFERENCES "facility_role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility_user" ADD CONSTRAINT "FK_9f3f2052a60324e0bcf09bdd01d" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" ADD CONSTRAINT "FK_f89490faf569c34c69d013b2eab" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "environment_value" ADD CONSTRAINT "FK_ad94ea4acc84f86e3db40ef1928" FOREIGN KEY ("environmentId") REFERENCES "environment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "environment_value" ADD CONSTRAINT "FK_6d100825db3886a5ea46bde7949" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "environment_value" ADD CONSTRAINT "FK_f32bf0555166f12c8e77a473e00" FOREIGN KEY ("facilityId") REFERENCES "facility"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "group_role" ADD CONSTRAINT "FK_b11d8e46d3b4b42a7a5017fa967" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "group_user" ADD CONSTRAINT "FK_c668a68c15f16d05c2a0102a51d" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "group_user" ADD CONSTRAINT "FK_79924246e997ad08c58819ac21d" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "group_user" ADD CONSTRAINT "FK_22ac3fccbadfc682a1c8cbc4099" FOREIGN KEY ("groupRoleId") REFERENCES "group_role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "group_user" ADD CONSTRAINT "FK_ac12f15186f583b8adf04d89f00" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "refresh_token" ADD CONSTRAINT "FK_8e913e288156c133999341156ad" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "primary_user" ADD CONSTRAINT "FK_ccfb6f8f8288e42fcc830f9aa6c" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "primary_user" ADD CONSTRAINT "FK_e31d1dea62258134cf930de55ef" FOREIGN KEY ("primaryRoleId") REFERENCES "primary_role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "primary_user" DROP CONSTRAINT "FK_e31d1dea62258134cf930de55ef"`,
    );
    await queryRunner.query(
      `ALTER TABLE "primary_user" DROP CONSTRAINT "FK_ccfb6f8f8288e42fcc830f9aa6c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "refresh_token" DROP CONSTRAINT "FK_8e913e288156c133999341156ad"`,
    );
    await queryRunner.query(
      `ALTER TABLE "group_user" DROP CONSTRAINT "FK_ac12f15186f583b8adf04d89f00"`,
    );
    await queryRunner.query(
      `ALTER TABLE "group_user" DROP CONSTRAINT "FK_22ac3fccbadfc682a1c8cbc4099"`,
    );
    await queryRunner.query(
      `ALTER TABLE "group_user" DROP CONSTRAINT "FK_79924246e997ad08c58819ac21d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "group_user" DROP CONSTRAINT "FK_c668a68c15f16d05c2a0102a51d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "group_role" DROP CONSTRAINT "FK_b11d8e46d3b4b42a7a5017fa967"`,
    );
    await queryRunner.query(
      `ALTER TABLE "environment_value" DROP CONSTRAINT "FK_f32bf0555166f12c8e77a473e00"`,
    );
    await queryRunner.query(
      `ALTER TABLE "environment_value" DROP CONSTRAINT "FK_6d100825db3886a5ea46bde7949"`,
    );
    await queryRunner.query(
      `ALTER TABLE "environment_value" DROP CONSTRAINT "FK_ad94ea4acc84f86e3db40ef1928"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility" DROP CONSTRAINT "FK_f89490faf569c34c69d013b2eab"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility_user" DROP CONSTRAINT "FK_9f3f2052a60324e0bcf09bdd01d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility_user" DROP CONSTRAINT "FK_00887e31c8f25ffbac20953b73b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility_user" DROP CONSTRAINT "FK_ae3cacbc390aef6d3e707747d00"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility_user" DROP CONSTRAINT "FK_2325edd17c8fe8cd5239f05e5b4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facility_role" DROP CONSTRAINT "FK_aec906f4ffc469cda9020112419"`,
    );
    await queryRunner.query(
      `ALTER TABLE "environment" DROP CONSTRAINT "FK_59c6a9ee3ec6120664d78e6488d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "entity_definition" DROP CONSTRAINT "FK_0947f2c04c4a697447afe305c1d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "entity_field" DROP CONSTRAINT "FK_009c6e9cf5fb119a7d0e1ac4884"`,
    );
    await queryRunner.query(
      `ALTER TABLE "entity_field" DROP CONSTRAINT "FK_90e90ab7748783ac4e925479fef"`,
    );
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "primary_user"`);
    await queryRunner.query(`DROP TABLE "primary_role"`);
    await queryRunner.query(`DROP TABLE "refresh_token"`);
    await queryRunner.query(`DROP TABLE "group_user"`);
    await queryRunner.query(`DROP TABLE "group_role"`);
    await queryRunner.query(`DROP TABLE "project"`);
    await queryRunner.query(`DROP TABLE "environment_value"`);
    await queryRunner.query(`DROP TABLE "facility"`);
    await queryRunner.query(`DROP TABLE "group"`);
    await queryRunner.query(`DROP TABLE "facility_user"`);
    await queryRunner.query(`DROP TABLE "facility_role"`);
    await queryRunner.query(`DROP TABLE "environment"`);
    await queryRunner.query(`DROP TYPE "public"."environment_destination_enum"`);
    await queryRunner.query(`DROP TYPE "public"."environment_valuetype_enum"`);
    await queryRunner.query(`DROP TABLE "entity_definition"`);
    await queryRunner.query(`DROP TYPE "public"."entity_definition_type_enum"`);
    await queryRunner.query(`DROP TABLE "entity_field"`);
    await queryRunner.query(`DROP TYPE "public"."entity_field_type_enum"`);
  }
}
