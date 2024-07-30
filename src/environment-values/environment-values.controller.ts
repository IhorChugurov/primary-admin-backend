import { Controller, Get, HttpStatus, ParseUUIDPipe, Query } from "@nestjs/common";
import { EnvironmentValuesService } from "./environment-values.service";
import { Roles } from "src/primary-users/authorization/decorators/primary-roles.decorator";
import { ProjectId } from "src/projects/decorators/project-id.decorator";

@Roles("SuperAdmin", "Admin")
@Controller("environment-values")
export class EnvironmentValuesController {
  constructor(private readonly environmentValuesService: EnvironmentValuesService) {}

  @Get()
  findAll(
    @ProjectId() projectId: string,
    //TODO improve the validation
    // @Query("facilityId", new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }))
    @Query("facilityId")
    facilityId: string,
  ) {
    return this.environmentValuesService.findAll(projectId, facilityId);
  }
}
