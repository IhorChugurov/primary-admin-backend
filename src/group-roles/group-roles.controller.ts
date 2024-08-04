import { Controller, Get } from "@nestjs/common";
import { Roles } from "src/primary-users/authorization/decorators/primary-roles.decorator";
import { UseDto } from "src/common/decorators/dto.decorator";
import { GroupRoleDto } from "./dto/group-role.dto";
import { GroupRolesService } from "./group-roles.service";
import { EntityType } from "src/common/enums/entity-type.enum";
import { EntityTypeController } from "src/common/decorators/entity-type-controller.decorator";
import { ProjectId } from "src/common/decorators/project-id-header.decorator";
import { UUIDParam } from "src/common/decorators/uuid-param.decorator";

@Roles("SuperAdmin", "Admin")
@UseDto(GroupRoleDto)
@EntityTypeController(EntityType.GROUP_ROLE)
@Controller("group-roles")
export class GroupRolesController {
  constructor(private readonly groupRolesService: GroupRolesService) {}

  @Get()
  findAll(@ProjectId() projectId: string): Promise<GroupRoleDto[]> {
    return this.groupRolesService.findAll(projectId);
  }

  @Get(":id")
  findOne(@UUIDParam() groupRoleId: string, @ProjectId() projectId: string): Promise<GroupRoleDto> {
    return this.groupRolesService.findOne(groupRoleId, projectId);
  }
}
