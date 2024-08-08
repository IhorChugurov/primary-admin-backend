import { Controller, Get, Post, Body, Patch, Delete, Query } from "@nestjs/common";
import { EntityDefinitionsService } from "./entity-definitions.service";
import { CreateEntityDefinitionDto } from "./dto/create-entity-definition.dto";
import { UpdateEntityDefinitionDto } from "./dto/update-entity-definition.dto";
import { Roles } from "src/primary-users/authorization/decorators/primary-roles.decorator";
import { EntityTypeController } from "src/common/decorators/entity-type-controller.decorator";
import { EntityType } from "src/common/enums/entity-type.enum";
import { UseDto } from "src/common/decorators/dto.decorator";
import { EntityDefinitionRelationsDto } from "./dto/entity-definition-relations.dto";
import { ProjectId } from "src/common/decorators/project-id-header.decorator";
import { PaginationOptionsDto } from "src/common/dto/pagination-options.dto";
import { UUIDParam } from "src/common/decorators/uuid-param.decorator";
import { PaginationDto } from "src/common/dto/pagination.dto";
import { EntityDefinitionListDto } from "./dto/entity-definition-list.dto";
import { ResponseMessage } from "src/common/interfaces/response-message.interface";

@Roles("SuperAdmin", "Admin")
@EntityTypeController(EntityType.ENVIRONMENT)
@Controller("entity-definitions")
export class EntityDefinitionsController {
  constructor(private readonly entityDefinitionsService: EntityDefinitionsService) {}

  @UseDto(EntityDefinitionRelationsDto)
  @Post()
  create(
    @Body() createEntityDefinitionDto: CreateEntityDefinitionDto,
    @ProjectId() projectId: string,
  ): Promise<EntityDefinitionRelationsDto> {
    return this.entityDefinitionsService.create(createEntityDefinitionDto, projectId);
  }

  @Get()
  findMany(
    @Query() paginationOptionsDto: PaginationOptionsDto,
    @ProjectId() projectId: string,
  ): Promise<PaginationDto<EntityDefinitionListDto>> {
    return this.entityDefinitionsService.findMany(paginationOptionsDto, projectId);
  }

  @UseDto(EntityDefinitionRelationsDto)
  @Get(":id")
  findOne(
    @UUIDParam() entityDefinitionId: string,
    @ProjectId() projectId: string,
  ): Promise<EntityDefinitionRelationsDto> {
    return this.entityDefinitionsService.findOneWithRelations(entityDefinitionId, projectId);
  }

  @UseDto(EntityDefinitionRelationsDto)
  @Patch(":id")
  update(
    @UUIDParam() entityDefinitionId: string,
    @Body() updateEntityDefinitionDto: UpdateEntityDefinitionDto,
    @ProjectId() projectId: string,
  ): Promise<EntityDefinitionRelationsDto> {
    return this.entityDefinitionsService.update(
      entityDefinitionId,
      updateEntityDefinitionDto,
      projectId,
    );
  }

  @Delete(":id")
  remove(
    @UUIDParam() entityDefinitionId: string,
    @ProjectId() projectId: string,
  ): Promise<ResponseMessage> {
    return this.entityDefinitionsService.remove(entityDefinitionId, projectId);
  }
}
