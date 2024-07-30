import { Body, Controller, Get, HttpStatus, ParseUUIDPipe, Post, Query } from "@nestjs/common";
import { EnvironmentValuesService } from "./environment-values.service";
import { Roles } from "src/primary-users/authorization/decorators/primary-roles.decorator";
import { ProjectId } from "src/projects/decorators/project-id.decorator";
import { EnvironmentValueListDto } from "./dto/environment-value-list.dto";
import { UseDto } from "src/common/decorators/dto.decorator";
import { UpdateManyEnvironmentValuesDto } from "./dto/update-many-environment-value.dto";
import { ResponseMessage } from "src/common/interfaces/response-message.interface";

@Roles("SuperAdmin", "Admin")
@Controller("environment-values")
export class EnvironmentValuesController {
  constructor(private readonly environmentValuesService: EnvironmentValuesService) {}

  @UseDto(EnvironmentValueListDto)
  @Get()
  findAll(
    @ProjectId() projectId: string,
    //TODO improve the validation
    // @Query("facilityId", new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }))
    @Query("facilityId")
    facilityId: string,
  ): Promise<EnvironmentValueListDto[]> {
    return this.environmentValuesService.findAll(projectId, facilityId);
  }

  @Post("update-many")
  update(
    @ProjectId() projectId: string,
    @Body() updateManyEnvironmentValuesDto: UpdateManyEnvironmentValuesDto,
  ): Promise<ResponseMessage> {
    return this.environmentValuesService.updateMany(projectId, updateManyEnvironmentValuesDto);
  }
}
