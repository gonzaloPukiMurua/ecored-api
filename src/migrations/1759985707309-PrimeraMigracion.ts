import { MigrationInterface, QueryRunner } from "typeorm";

export class PrimeraMigracion1759985707309 implements MigrationInterface {
    name = 'PrimeraMigracion1759985707309'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categories" ("category_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "parentCategoryId" uuid, CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE ("name"), CONSTRAINT "PK_51615bef2cea22812d0dcab6e18" PRIMARY KEY ("category_id"))`);
        await queryRunner.query(`CREATE TABLE "product_photo" ("photo_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "url" character varying NOT NULL, "position" integer NOT NULL DEFAULT '0', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "productProductId" uuid, CONSTRAINT "PK_7744f16153d4effe45e933fea40" PRIMARY KEY ("photo_id"))`);
        await queryRunner.query(`CREATE TYPE "public"."deliveries_confirmed_by_enum" AS ENUM('owner', 'requester')`);
        await queryRunner.query(`CREATE TABLE "deliveries" ("delivery_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "confirmed_by" "public"."deliveries_confirmed_by_enum" NOT NULL, "confirmed_at" TIMESTAMP NOT NULL DEFAULT now(), "requestRequestId" uuid, CONSTRAINT "REL_011f33ac6a7f5e28108dfa6ed3" UNIQUE ("requestRequestId"), CONSTRAINT "PK_91135f316d7af8faf5bfce6fb35" PRIMARY KEY ("delivery_id"))`);
        await queryRunner.query(`CREATE TYPE "public"."requests_status_enum" AS ENUM('pending', 'accepted', 'rejected', 'cancelled')`);
        await queryRunner.query(`CREATE TABLE "requests" ("request_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" "public"."requests_status_enum" NOT NULL DEFAULT 'pending', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "productProductId" uuid, "requesterUserId" uuid, CONSTRAINT "PK_4e7b87d34546d9f21a648aed04d" PRIMARY KEY ("request_id"))`);
        await queryRunner.query(`CREATE TYPE "public"."products_item_condition_enum" AS ENUM('nuevo', 'como_nuevo', 'usable', 'repuestos')`);
        await queryRunner.query(`CREATE TYPE "public"."products_status_enum" AS ENUM('draft', 'published', 'blocked', 'delivered')`);
        await queryRunner.query(`CREATE TABLE "products" ("product_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" text NOT NULL, "item_condition" "public"."products_item_condition_enum" NOT NULL, "status" "public"."products_status_enum" NOT NULL DEFAULT 'draft', "lat" double precision, "lng" double precision, "zone_text" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "ownerUserId" uuid, "categoryCategoryId" uuid NOT NULL, "subcategoryCategoryId" uuid, CONSTRAINT "PK_a8940a4bf3b90bd7ac15c8f4dd9" PRIMARY KEY ("product_id"))`);
        await queryRunner.query(`CREATE TYPE "public"."reports_target_type_enum" AS ENUM('listing', 'user')`);
        await queryRunner.query(`CREATE TYPE "public"."reports_status_enum" AS ENUM('open', 'reviewed', 'blocked', 'ignored')`);
        await queryRunner.query(`CREATE TABLE "reports" ("report_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "target_type" "public"."reports_target_type_enum" NOT NULL, "target_id" character varying NOT NULL, "reason" character varying NOT NULL, "status" "public"."reports_status_enum" NOT NULL DEFAULT 'open', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "resolved_at" TIMESTAMP, "reporterUserId" uuid, "resolverUserId" uuid, CONSTRAINT "PK_e5cb9f2cacc967a3de2f6635323" PRIMARY KEY ("report_id"))`);
        await queryRunner.query(`CREATE TYPE "public"."events_analytics_event_type_enum" AS ENUM('UserSignedUp', 'PublicationCreated', 'View', 'SearchPerformed', 'RequestSent', 'RequestAccepted', 'RequestRejected', 'ContactClicked', 'DeliveryConfirmed', 'ReportSubmitted')`);
        await queryRunner.query(`CREATE TABLE "events_analytics" ("event_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "event_type" "public"."events_analytics_event_type_enum" NOT NULL, "payload" jsonb, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "userUserId" uuid, "listingProductId" uuid, "requestRequestId" uuid, CONSTRAINT "PK_7bd0cdcbaf8dcfb3ace12b617e5" PRIMARY KEY ("event_id"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('user', 'admin')`);
        await queryRunner.query(`CREATE TABLE "users" ("user_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "name" character varying NOT NULL, "role" "public"."users_role_enum" NOT NULL DEFAULT 'user', "is_verified" boolean NOT NULL DEFAULT false, "password" character varying NOT NULL, "zone_text" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_96aac72f1574b88752e9fb00089" PRIMARY KEY ("user_id"))`);
        await queryRunner.query(`ALTER TABLE "categories" ADD CONSTRAINT "FK_ccde635bce518afe7c110858cc4" FOREIGN KEY ("parentCategoryId") REFERENCES "categories"("category_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_photo" ADD CONSTRAINT "FK_266d81c04e0e736ab9ab34e169e" FOREIGN KEY ("productProductId") REFERENCES "products"("product_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "deliveries" ADD CONSTRAINT "FK_011f33ac6a7f5e28108dfa6ed34" FOREIGN KEY ("requestRequestId") REFERENCES "requests"("request_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "requests" ADD CONSTRAINT "FK_aec980a0f31c45a32483218eda5" FOREIGN KEY ("productProductId") REFERENCES "products"("product_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "requests" ADD CONSTRAINT "FK_442952e763e78eca4964df203bc" FOREIGN KEY ("requesterUserId") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_73bf454f991ff30a329b0fc5410" FOREIGN KEY ("ownerUserId") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_a06a40e89f9347c0f1c7e6834eb" FOREIGN KEY ("categoryCategoryId") REFERENCES "categories"("category_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_80ceaa3719f540d7883554c6210" FOREIGN KEY ("subcategoryCategoryId") REFERENCES "categories"("category_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reports" ADD CONSTRAINT "FK_8e7fb8dbb86246e2fdab2603976" FOREIGN KEY ("reporterUserId") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reports" ADD CONSTRAINT "FK_b7c4add1d5af5a0f01ef8d6a2af" FOREIGN KEY ("resolverUserId") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "events_analytics" ADD CONSTRAINT "FK_212ef96171450f073ddbad266a3" FOREIGN KEY ("userUserId") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "events_analytics" ADD CONSTRAINT "FK_7782502f2053b16c6350f7e0532" FOREIGN KEY ("listingProductId") REFERENCES "products"("product_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "events_analytics" ADD CONSTRAINT "FK_eae53dbf5b4145f0fb9698d4841" FOREIGN KEY ("requestRequestId") REFERENCES "requests"("request_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events_analytics" DROP CONSTRAINT "FK_eae53dbf5b4145f0fb9698d4841"`);
        await queryRunner.query(`ALTER TABLE "events_analytics" DROP CONSTRAINT "FK_7782502f2053b16c6350f7e0532"`);
        await queryRunner.query(`ALTER TABLE "events_analytics" DROP CONSTRAINT "FK_212ef96171450f073ddbad266a3"`);
        await queryRunner.query(`ALTER TABLE "reports" DROP CONSTRAINT "FK_b7c4add1d5af5a0f01ef8d6a2af"`);
        await queryRunner.query(`ALTER TABLE "reports" DROP CONSTRAINT "FK_8e7fb8dbb86246e2fdab2603976"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_80ceaa3719f540d7883554c6210"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_a06a40e89f9347c0f1c7e6834eb"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_73bf454f991ff30a329b0fc5410"`);
        await queryRunner.query(`ALTER TABLE "requests" DROP CONSTRAINT "FK_442952e763e78eca4964df203bc"`);
        await queryRunner.query(`ALTER TABLE "requests" DROP CONSTRAINT "FK_aec980a0f31c45a32483218eda5"`);
        await queryRunner.query(`ALTER TABLE "deliveries" DROP CONSTRAINT "FK_011f33ac6a7f5e28108dfa6ed34"`);
        await queryRunner.query(`ALTER TABLE "product_photo" DROP CONSTRAINT "FK_266d81c04e0e736ab9ab34e169e"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP CONSTRAINT "FK_ccde635bce518afe7c110858cc4"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`DROP TABLE "events_analytics"`);
        await queryRunner.query(`DROP TYPE "public"."events_analytics_event_type_enum"`);
        await queryRunner.query(`DROP TABLE "reports"`);
        await queryRunner.query(`DROP TYPE "public"."reports_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."reports_target_type_enum"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TYPE "public"."products_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."products_item_condition_enum"`);
        await queryRunner.query(`DROP TABLE "requests"`);
        await queryRunner.query(`DROP TYPE "public"."requests_status_enum"`);
        await queryRunner.query(`DROP TABLE "deliveries"`);
        await queryRunner.query(`DROP TYPE "public"."deliveries_confirmed_by_enum"`);
        await queryRunner.query(`DROP TABLE "product_photo"`);
        await queryRunner.query(`DROP TABLE "categories"`);
    }

}
