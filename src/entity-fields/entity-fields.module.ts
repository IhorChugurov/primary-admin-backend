import { Module } from "@nestjs/common";
import { EntityFieldsService } from "./entity-fields.service";
import { EntityFieldsController } from "./entity-fields.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EntityField } from "./entities/entity-field.entity";
import { EntityDefinitionsModule } from "src/enitity-definitions/entity-definitions.module";
import { EntityFieldRepository } from "./repositories/entity-filed.repository";

@Module({
  imports: [TypeOrmModule.forFeature([EntityField]), EntityDefinitionsModule],
  controllers: [EntityFieldsController],
  providers: [EntityFieldsService, EntityFieldRepository],
})
export class EntityFieldsModule {}
