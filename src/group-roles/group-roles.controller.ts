import { Controller, Get, Param } from "@nestjs/common";
import { Roles } from "src/primary-users/authorization/decorators/primary-roles.decorator";
import { UseDto } from "src/common/decorators/dto.decorator";
import { GroupRoleDto } from "./dto/group-role.dto";
import { GroupRolesService } from "./group-roles.service";

@Roles("SuperAdmin", "Admin")
@UseDto(GroupRoleDto)
@Controller("group-roles")
export class GroupRolesController {
  constructor(private readonly groupRolesService: GroupRolesService) {}

  @Get()
  findAll(): Promise<GroupRoleDto[]> {
    return this.groupRolesService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") groupId: string): Promise<GroupRoleDto> {
    return this.groupRolesService.findOne(groupId);
  }
}
