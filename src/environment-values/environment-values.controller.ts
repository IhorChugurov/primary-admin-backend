import { Body, Controller, Get, Post } from "@nestjs/common";
import { EnvironmentValuesService } from "./environment-values.service";
import { Roles } from "src/primary-users/authorization/decorators/primary-roles.decorator";
import { EnvironmentValueListDto } from "./dto/environment-value-list.dto";
import { UseDto } from "src/common/decorators/dto.decorator";
import { UpdateManyEnvironmentValuesDto } from "./dto/update-many-environment-value.dto";
import { ResponseMessage } from "src/common/interfaces/response-message.interface";
import { EntityType } from "src/common/enums/entity-type.enum";
import { EntityTypeController } from "src/common/decorators/entity-type-controller.decorator";
import { ProjectId } from "src/common/decorators/project-id-header.decorator";
import { FacilityId } from "src/common/decorators/facility-id-query.decorator";

@Roles("SuperAdmin", "Admin")
@EntityTypeController(EntityType.ENVIRONMENT_VALUE)
@Controller("environment-values")
export class EnvironmentValuesController {
  constructor(private readonly environmentValuesService: EnvironmentValuesService) {}

  @UseDto(EnvironmentValueListDto)
  @Get()
  findManyFacilityEnvironmentValues(
    @ProjectId() projectId: string,
    @FacilityId() facilityId: string,
  ): Promise<EnvironmentValueListDto[]> {
    return this.environmentValuesService.findMany(projectId, facilityId);
  }

  @UseDto(EnvironmentValueListDto)
  @Get("project-environment-values")
  findManyProjectEnvironmentValues(
    @ProjectId() projectId: string,
  ): Promise<EnvironmentValueListDto[]> {
    return this.environmentValuesService.findMany(projectId);
  }

  @Post()
  updateManyFacilityEnvironmentValues(
    @ProjectId() projectId: string,
    @Body() updateManyEnvironmentValuesDto: UpdateManyEnvironmentValuesDto,
    @FacilityId({ required: false }) facilityId?: string,
  ): Promise<ResponseMessage> {
    return this.environmentValuesService.updateMany(
      projectId,
      updateManyEnvironmentValuesDto,
      facilityId,
    );
  }

  @Post("project-environment-values")
  updateManyProjectEnvironmentValues(
    @ProjectId() projectId: string,
    @Body() updateManyEnvironmentValuesDto: UpdateManyEnvironmentValuesDto,
  ): Promise<ResponseMessage> {
    return this.environmentValuesService.updateMany(projectId, updateManyEnvironmentValuesDto);
  }
}
