import { Controller, Get, Param } from "@nestjs/common";
import { PrimaryRolesService } from "./primary-roles.service";
import { UseDto } from "src/common/decorators/dto.decorator";
import { PrimaryRoleDto } from "./dto/primary-role.dto";
import { Roles } from "src/primary-users/authorization/decorators/primary-roles.decorator";

@Roles("SuperAdmin", "Admin")
@UseDto(PrimaryRoleDto)
@Controller("primary-roles")
export class PrimaryRolesController {
  constructor(private readonly primaryRolesService: PrimaryRolesService) {}

  @Get()
  findAll(): Promise<PrimaryRoleDto[]> {
    return this.primaryRolesService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") primaryRoleId: string): Promise<PrimaryRoleDto> {
    return this.primaryRolesService.findOne(primaryRoleId);
  }
}
