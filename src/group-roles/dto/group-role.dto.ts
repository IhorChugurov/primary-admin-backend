import { Expose, Type } from "class-transformer";
import { ProjectDto } from "src/projects/dto/project.dto";

export class GroupRoleDto {
  @Expose()
  readonly id: string;

  @Expose()
  readonly name: string;

  @Expose()
  readonly description: string;

  @Expose()
  @Type(() => ProjectDto)
  readonly project: ProjectDto;
}
