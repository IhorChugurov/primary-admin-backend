import { Expose, Type } from "class-transformer";
import { ProjectDto } from "src/projects/dto/project.dto";

export class EntityDefinitionRelationsDto {
  @Expose()
  readonly id: string;

  @Expose()
  readonly name: string;

  @Expose()
  readonly url: string;

  @Expose()
  readonly tableName: string;

  @Expose()
  readonly description: string;

  @Expose()
  readonly type: string;

  @Expose()
  @Type(() => ProjectDto)
  readonly project: ProjectDto;
}
