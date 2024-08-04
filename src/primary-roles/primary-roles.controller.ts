import { Controller, Get, Param } from "@nestjs/common";
import { PrimaryRolesService } from "./primary-roles.service";
import { UseDto } from "src/common/decorators/dto.decorator";
import { PrimaryRoleDto } from "./dto/primary-role.dto";
import { Roles } from "src/primary-users/authorization/decorators/primary-roles.decorator";
import { EntityTypeController } from "src/common/decorators/entity-type-controller.decorator";
import { EntityType } from "src/common/enums/entity-type.enum";
import { UUIDParam } from "src/common/decorators/uuid-param.decorator";

@Roles("SuperAdmin", "Admin")
@EntityTypeController(EntityType.PRIMARY_ROLE)
@UseDto(PrimaryRoleDto)
@Controller("primary-roles")
export class PrimaryRolesController {
  constructor(private readonly primaryRolesService: PrimaryRolesService) {}

  @Get()
  findAll(): Promise<PrimaryRoleDto[]> {
    return this.primaryRolesService.findAll();
  }

  @Get(":id")
  findOne(@UUIDParam() primaryRoleId: string): Promise<PrimaryRoleDto> {
    return this.primaryRolesService.findOne(primaryRoleId);
  }
}
