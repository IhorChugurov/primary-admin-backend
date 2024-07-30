import { Expose, Type } from "class-transformer";
import { ProjectDto } from "src/projects/dto/project.dto";

export class EnvironmentRelationsDto {
  @Expose()
  readonly id: string;

  @Expose()
  readonly key: string;

  @Expose()
  readonly valueType: string;

  @Expose()
  readonly destination: string;

  @Expose()
  readonly label: string;

  @Expose()
  readonly placeholder: string;

  @Expose()
  readonly description: string;

  @Expose()
  @Type(() => ProjectDto)
  readonly project: ProjectDto;
}
