import { Expose, Type } from "class-transformer";
import { GroupRoleDto } from "src/group-roles/dto/group-role.dto";
import { GroupDto } from "src/groups/dto/group.dto";
import { ProjectDto } from "src/projects/dto/project.dto";
import { UserDto } from "src/users/dto/user.dto";

export class GroupUserDto {
  @Expose()
  readonly id: string;

  @Expose()
  @Type(() => UserDto)
  readonly user: UserDto;

  @Expose()
  @Type(() => GroupDto)
  readonly group: GroupDto;

  @Expose()
  @Type(() => GroupRoleDto)
  readonly groupRole: GroupRoleDto;

  @Expose()
  @Type(() => ProjectDto)
  readonly project: ProjectDto;
}
