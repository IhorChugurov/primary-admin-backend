import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateEntityDefinitionDto } from "./dto/create-entity-definition.dto";
import { UpdateEntityDefinitionDto } from "./dto/update-entity-definition.dto";
import { EntityDefinitionRepository } from "./repositories/entity-definition.repository";
import { ProjectsService } from "src/projects/projects.service";
import { EntityDefinition } from "./entities/entity-definition.entity";
import { PaginationOptionsDto } from "src/common/dto/pagination-options.dto";
import { PaginationDto } from "src/common/dto/pagination.dto";
import { EntityDefinitionListDto } from "./dto/entity-definition-list.dto";
import { plainToInstance } from "class-transformer";
import { PaginationMetaDto } from "src/common/dto/pagination-meta.dto";
import { ResponseMessage } from "src/common/interfaces/response-message.interface";

@Injectable()
export class EntityDefinitionsService {
  constructor(
    private readonly entityDefinitionRepository: EntityDefinitionRepository,
    private readonly projectsService: ProjectsService,
  ) {}

  async create(
    createEntityDefinitionDto: CreateEntityDefinitionDto,
    projectId: string,
  ): Promise<EntityDefinition> {
    const project = await this.projectsService.findOne(projectId);
    return this.entityDefinitionRepository.createAndSave(createEntityDefinitionDto, project);
  }

  async findMany(
    paginationOptionsDto: PaginationOptionsDto,
    projectId: string,
  ): Promise<PaginationDto<EntityDefinitionListDto>> {
    const { entities, totalItems } =
      await this.entityDefinitionRepository.findManyWithPaginationAndRelations(
        paginationOptionsDto,
        projectId,
      );

    const entityDefinitionDtos = plainToInstance(EntityDefinitionListDto, entities, {
      excludeExtraneousValues: true,
    });

    const paginationMetaDto = new PaginationMetaDto({
      paginationOptionsDto,
      totalItems,
    });

    return new PaginationDto(entityDefinitionDtos, paginationMetaDto);
  }

  async findOneWithRelations(
    entityDefinitionId: string,
    projectId: string,
  ): Promise<EntityDefinition> {
    const entityDefinition = await this.entityDefinitionRepository.findOneByIdWithRelations(
      entityDefinitionId,
      projectId,
      ["project"],
    );
    if (!entityDefinition) {
      throw new NotFoundException(`Entity with ID #${entityDefinitionId} not found`);
    }
    return entityDefinition;
  }

  async findOne(entityDefinitionId: string, projectId: string): Promise<EntityDefinition> {
    const entityDefinition = await this.entityDefinitionRepository.findOneByID(
      entityDefinitionId,
      projectId,
    );
    if (!entityDefinition) {
      throw new NotFoundException(`Entity with ID #${entityDefinitionId} not found`);
    }
    return entityDefinition;
  }

  async update(
    entityDefinitionId: string,
    updateEntityDefinitionDto: UpdateEntityDefinitionDto,
    projectId: string,
  ): Promise<EntityDefinition> {
    const entityDefinition = await this.entityDefinitionRepository.findOneByID(
      entityDefinitionId,
      projectId,
    );
    if (!entityDefinition) {
      throw new NotFoundException(`Entity with ID #${entityDefinitionId} not found`);
    }
    return this.entityDefinitionRepository.updateByIdWithRelations(
      entityDefinitionId,
      updateEntityDefinitionDto,
      projectId,
      ["project"],
    );
  }

  async remove(entityDefinitionId: string, projectId: string): Promise<ResponseMessage> {
    const entityDefinition = await this.entityDefinitionRepository.findOneByID(
      entityDefinitionId,
      projectId,
    );
    if (!entityDefinition) {
      throw new NotFoundException(`Entity with ID #${entityDefinitionId} not found`);
    }
    await this.entityDefinitionRepository.deleteById(entityDefinitionId, projectId);
    return {
      message: `Entity with ID #${entityDefinitionId} has been deleted successfully`,
    };
  }
}
