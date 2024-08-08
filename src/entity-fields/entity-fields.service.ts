import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateEntityFieldDto } from "./dto/create-entity-field.dto";
import { UpdateEntityFieldDto } from "./dto/update-entity-field.dto";
import { EntityFieldRepository } from "./repositories/entity-filed.repository";
import { EntityDefinitionsService } from "src/enitity-definitions/entity-definitions.service";
import { PaginationOptionsDto } from "src/common/dto/pagination-options.dto";
import { PaginationDto } from "src/common/dto/pagination.dto";
import { EntityFieldListDto } from "./dto/entity-filed-list.dto";
import { plainToInstance } from "class-transformer";
import { PaginationMetaDto } from "src/common/dto/pagination-meta.dto";
import { EntityField } from "./entities/entity-field.entity";
import { ResponseMessage } from "src/common/interfaces/response-message.interface";
import { EntityDefinition } from "src/enitity-definitions/entities/entity-definition.entity";

@Injectable()
export class EntityFieldsService {
  constructor(
    private readonly entityFieldRepository: EntityFieldRepository,
    private readonly entityDefinitionsService: EntityDefinitionsService,
  ) {}

  async create(
    createEntityFieldDto: CreateEntityFieldDto,
    projectId: string,
  ): Promise<EntityField> {
    const entityDefinition = await this.entityDefinitionsService.findOne(
      createEntityFieldDto.entityDefinitionId,
      projectId,
    );
    let selectorSource: EntityDefinition;
    if (createEntityFieldDto.selectorSourceId) {
      selectorSource = await this.entityDefinitionsService.findOne(
        createEntityFieldDto.selectorSourceId,
        projectId,
      );
    }
    return this.entityFieldRepository.createAndSave(
      createEntityFieldDto,
      entityDefinition,
      selectorSource,
    );
  }

  async findMany(
    paginationOptionsDto: PaginationOptionsDto,
    entityDefinitionId: string,
  ): Promise<PaginationDto<EntityFieldListDto>> {
    const { entities, totalItems } =
      await this.entityFieldRepository.findManyWithPaginationAndRelations(
        paginationOptionsDto,
        entityDefinitionId,
      );

    const entityFieldDtos = plainToInstance(EntityFieldListDto, entities, {
      excludeExtraneousValues: true,
    });

    const paginationMetaDto = new PaginationMetaDto({
      paginationOptionsDto,
      totalItems,
    });

    return new PaginationDto(entityFieldDtos, paginationMetaDto);
  }

  async findOneWithRelations(entityFieldId: string): Promise<EntityField> {
    const entityField = await this.entityFieldRepository.findOneByIdWithRelations(entityFieldId, [
      "entityDefinition",
      "selectorSource",
    ]);
    if (!entityField) {
      throw new NotFoundException(`Entity field with ID #${entityFieldId} not found`);
    }
    return entityField;
  }

  async update(
    entityFieldId: string,
    updateEntityFieldDto: UpdateEntityFieldDto,
    projectId: string,
  ): Promise<EntityField> {
    const entityField = await this.entityFieldRepository.findOneByID(entityFieldId);
    if (!entityField) {
      throw new NotFoundException(`Entity field with ID #${entityFieldId} not found`);
    }
    let selectorSource: EntityDefinition;
    if (updateEntityFieldDto.selectorSourceId) {
      selectorSource = await this.entityDefinitionsService.findOne(
        updateEntityFieldDto.selectorSourceId,
        projectId,
      );
    }
    return this.entityFieldRepository.updateByIdWithRelations(
      entityFieldId,
      updateEntityFieldDto,
      ["entityDefinition", "selectorSource"],
      selectorSource,
    );
  }

  async remove(entityFieldId: string): Promise<ResponseMessage> {
    const entityField = await this.entityFieldRepository.findOneByID(entityFieldId);
    if (!entityField) {
      throw new NotFoundException(`Entity field with ID #${entityFieldId} not found`);
    }
    await this.entityFieldRepository.deleteById(entityFieldId);
    return {
      message: `Entity field with ID #${entityFieldId} has been deleted successfully`,
    };
  }
}
