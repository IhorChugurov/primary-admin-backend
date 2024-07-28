import { Controller, Get, Param } from "@nestjs/common";
import { Roles } from "src/primary-users/authorization/decorators/primary-roles.decorator";
import { UseDto } from "src/common/decorators/dto.decorator";
import { FacilityRolesService } from "./facility-roles.service";
import { FacilityRoleDto } from "./dto/facility-role.dto";

@Roles("SuperAdmin", "Admin")
@UseDto(FacilityRoleDto)
@Controller("facility-roles")
export class FacilityRolesController {
  constructor(private readonly facilityRolesService: FacilityRolesService) {}

  @Get()
  findAll(): Promise<FacilityRoleDto[]> {
    return this.facilityRolesService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") facilityId: string): Promise<FacilityRoleDto> {
    return this.facilityRolesService.findOne(facilityId);
  }
}
