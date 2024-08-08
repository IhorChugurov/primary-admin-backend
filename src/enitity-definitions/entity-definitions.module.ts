import { Module } from "@nestjs/common";
import { EntityDefinitionsService } from "./entity-definitions.service";
import { EntityDefinitionsController } from "./entity-definitions.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EntityDefinition } from "./entities/entity-definition.entity";
import { EntityDefinitionRepository } from "./repositories/entity-definition.repository";
import { ProjectsModule } from "src/projects/projects.module";

@Module({
  imports: [TypeOrmModule.forFeature([EntityDefinition]), ProjectsModule],
  controllers: [EntityDefinitionsController],
  providers: [EntityDefinitionsService, EntityDefinitionRepository],
  exports: [EntityDefinitionsService],
})
export class EntityDefinitionsModule {}
