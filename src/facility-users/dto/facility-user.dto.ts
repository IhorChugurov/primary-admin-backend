import { Expose, Type } from "class-transformer";
import { FacilityDto } from "src/facilities/dto/facility.dto";
import { FacilityRoleDto } from "src/facility-roles/dto/facility-role.dto";
import { ProjectDto } from "src/projects/dto/project.dto";
import { UserDto } from "src/users/dto/user.dto";

export class FacilityUserDto {
  @Expose()
  readonly id: string;

  @Expose()
  @Type(() => UserDto)
  readonly user: UserDto;

  @Expose()
  @Type(() => FacilityDto)
  readonly facility: FacilityDto;

  @Expose()
  @Type(() => FacilityRoleDto)
  readonly facilityRole: FacilityRoleDto;

  @Expose()
  @Type(() => ProjectDto)
  readonly project: ProjectDto;
}
