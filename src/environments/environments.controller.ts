import { Controller, Get, Post, Body, Patch, Delete, Query } from "@nestjs/common";
import { EnvironmentsService } from "./environments.service";
import { CreateEnvironmentDto } from "./dto/create-environment.dto";
import { UpdateEnvironmentDto } from "./dto/update-environment.dto";
import { EnvironmentRelationsDto } from "./dto/environment-relations.dto";
import { Roles } from "src/primary-users/authorization/decorators/primary-roles.decorator";
import { UseDto } from "src/common/decorators/dto.decorator";
import { PaginationOptionsDto } from "src/common/dto/pagination-options.dto";
import { PaginationDto } from "src/common/dto/pagination.dto";
import { EnvironmentListDto } from "./dto/environment-list.dto";
import { ResponseMessage } from "src/common/interfaces/response-message.interface";
import { EntityType } from "src/common/enums/entity-type.enum";
import { EntityTypeController } from "src/common/decorators/entity-type-controller.decorator";
import { ProjectId } from "src/common/decorators/project-id-header.decorator";
import { UUIDParam } from "src/common/decorators/uuid-param.decorator";

@Roles("SuperAdmin", "Admin")
@EntityTypeController(EntityType.ENVIRONMENT)
@Controller("environments")
export class EnvironmentsController {
  constructor(private readonly environmentsService: EnvironmentsService) {}

  @UseDto(EnvironmentRelationsDto)
  @Post()
  create(
    @Body() createEnvironmentDto: CreateEnvironmentDto,
    @ProjectId() projectId: string,
  ): Promise<EnvironmentRelationsDto> {
    return this.environmentsService.create(createEnvironmentDto, projectId);
  }

  @Get()
  findMany(
    @Query() paginationOptionsDto: PaginationOptionsDto,
    @ProjectId() projectId: string,
  ): Promise<PaginationDto<EnvironmentListDto>> {
    return this.environmentsService.findMany(paginationOptionsDto, projectId);
  }

  @UseDto(EnvironmentRelationsDto)
  @Get(":id")
  findOne(
    @UUIDParam() environmentId: string,
    @ProjectId() projectId: string,
  ): Promise<EnvironmentRelationsDto> {
    return this.environmentsService.findOneWithRelations(environmentId, projectId);
  }

  @UseDto(EnvironmentRelationsDto)
  @Patch(":id")
  update(
    @UUIDParam() environmentId: string,
    @Body() updateEnvironmentDto: UpdateEnvironmentDto,
    @ProjectId() projectId: string,
  ): Promise<EnvironmentRelationsDto> {
    return this.environmentsService.update(environmentId, updateEnvironmentDto, projectId);
  }

  @Delete(":id")
  remove(
    @UUIDParam() environmentId: string,
    @ProjectId() projectId: string,
  ): Promise<ResponseMessage> {
    return this.environmentsService.remove(environmentId, projectId);
  }
}
