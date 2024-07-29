import { Controller, Get, Param } from "@nestjs/common";
import { Roles } from "src/primary-users/authorization/decorators/primary-roles.decorator";
import { UseDto } from "src/common/decorators/dto.decorator";
import { GroupRoleDto } from "./dto/group-role.dto";
import { GroupRolesService } from "./group-roles.service";
import { ProjectId } from "src/projects/decorators/project-id.decorator";

@Roles("SuperAdmin", "Admin")
@UseDto(GroupRoleDto)
@Controller("group-roles")
export class GroupRolesController {
  constructor(private readonly groupRolesService: GroupRolesService) {}

  @Get()
  findAll(@ProjectId() projectId: string): Promise<GroupRoleDto[]> {
    return this.groupRolesService.findAll(projectId);
  }

  @Get(":id")
  findOne(@Param("id") groupId: string, @ProjectId() projectId: string): Promise<GroupRoleDto> {
    return this.groupRolesService.findOne(groupId, projectId);
  }
}
