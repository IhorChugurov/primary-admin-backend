import { Controller, Get } from "@nestjs/common";
import { Roles } from "src/primary-users/authorization/decorators/primary-roles.decorator";
import { UseDto } from "src/common/decorators/dto.decorator";
import { FacilityRolesService } from "./facility-roles.service";
import { FacilityRoleDto } from "./dto/facility-role.dto";
import { ProjectId } from "src/common/decorators/project-id-header.decorator";
import { UUIDParam } from "src/common/decorators/uuid-param.decorator";
import { EntityTypeController } from "src/common/decorators/entity-type-controller.decorator";
import { EntityType } from "src/common/enums/entity-type.enum";

@Roles("SuperAdmin", "Admin")
@EntityTypeController(EntityType.FACILITY_ROLE)
@UseDto(FacilityRoleDto)
@Controller("facility-roles")
export class FacilityRolesController {
  constructor(private readonly facilityRolesService: FacilityRolesService) {}

  @Get()
  findAll(@ProjectId() projectId: string): Promise<FacilityRoleDto[]> {
    return this.facilityRolesService.findAll(projectId);
  }

  @Get(":id")
  findOne(
    @UUIDParam() facilityRoleId: string,
    @ProjectId() projectId: string,
  ): Promise<FacilityRoleDto> {
    return this.facilityRolesService.findOne(facilityRoleId, projectId);
  }
}
