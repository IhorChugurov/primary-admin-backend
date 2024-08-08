import { Controller, Get, Post, Body, Patch, Delete, Query } from "@nestjs/common";
import { EntityFieldsService } from "./entity-fields.service";
import { CreateEntityFieldDto } from "./dto/create-entity-field.dto";
import { UpdateEntityFieldDto } from "./dto/update-entity-field.dto";
import { Roles } from "src/primary-users/authorization/decorators/primary-roles.decorator";
import { EntityTypeController } from "src/common/decorators/entity-type-controller.decorator";
import { EntityType } from "src/common/enums/entity-type.enum";
import { UseDto } from "src/common/decorators/dto.decorator";
import { EntityFieldRelationsDto } from "./dto/entity-filed-relation.dto";
import { EntityDefinitionId } from "src/common/decorators/entity-definition-query.decorator";
import { PaginationOptionsDto } from "src/common/dto/pagination-options.dto";
import { PaginationDto } from "src/common/dto/pagination.dto";
import { EntityFieldListDto } from "./dto/entity-filed-list.dto";
import { UUIDParam } from "src/common/decorators/uuid-param.decorator";
import { ResponseMessage } from "src/common/interfaces/response-message.interface";
import { ProjectId } from "src/common/decorators/project-id-header.decorator";

@Roles("SuperAdmin", "Admin")
@EntityTypeController(EntityType.ENTITY_FIELD)
@Controller("entity-fields")
export class EntityFieldsController {
  constructor(private readonly entityFieldsService: EntityFieldsService) {}

  @UseDto(EntityFieldRelationsDto)
  @Post()
  create(
    @Body() createEntityFieldDto: CreateEntityFieldDto,
    @ProjectId() projectId: string,
  ): Promise<EntityFieldRelationsDto> {
    return this.entityFieldsService.create(createEntityFieldDto, projectId);
  }

  @Get()
  findMany(
    @Query() paginationOptionsDto: PaginationOptionsDto,
    @EntityDefinitionId() entityDefinitionId: string,
  ): Promise<PaginationDto<EntityFieldListDto>> {
    return this.entityFieldsService.findMany(paginationOptionsDto, entityDefinitionId);
  }

  @UseDto(EntityFieldRelationsDto)
  @Get(":id")
  findOne(@UUIDParam() entityFieldId: string): Promise<EntityFieldRelationsDto> {
    return this.entityFieldsService.findOneWithRelations(entityFieldId);
  }

  @UseDto(EntityFieldRelationsDto)
  @Patch(":id")
  update(
    @UUIDParam() entityFieldId: string,
    @Body() updateEntityFieldDto: UpdateEntityFieldDto,
    @ProjectId() projectId: string,
  ): Promise<EntityFieldRelationsDto> {
    return this.entityFieldsService.update(entityFieldId, updateEntityFieldDto, projectId);
  }

  @Delete(":id")
  remove(@UUIDParam() entityFieldId: string): Promise<ResponseMessage> {
    return this.entityFieldsService.remove(entityFieldId);
  }
}
